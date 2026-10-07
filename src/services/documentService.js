import { supabase } from '../utils/supabase';

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

/**
 * Validates document file
 */
export function validateDocumentFile(file) {
  if (!file) {
    return { valid: false, error: 'ഫയൽ നൽകിയിട്ടില്ല (No file selected)' };
  }

  const isValidType = ALLOWED_MIME_TYPES.includes(file.type) || 
    file.name.match(/\.(pdf|jpe?g|png)$/i);

  if (!isValidType) {
    return { 
      valid: false, 
      error: 'പിന്തുണയ്ക്കാത്ത ഫയൽ ഫോർമാറ്റ്. PDF, JPG, PNG ഫയലുകൾ മാത്രം അപ്‌ലോഡ് ചെയ്യുക (Only PDF, JPG, PNG allowed)' 
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { 
      valid: false, 
      error: 'ഫയൽ വലുപ്പം 15MB-ൽ താഴെയായിരിക്കണം (File size exceeds 15MB limit)' 
    };
  }

  return { valid: true, error: null };
}

/**
 * Calculates validity status from expiry date string
 */
export function computeValidityStatus(expiryDateStr) {
  if (!expiryDateStr) return 'VALID';

  try {
    const lower = expiryDateStr.toLowerCase();
    if (lower.includes('expired') || lower.includes('കാലഹരണപ്പെട്ടു')) {
      return 'EXPIRED';
    }
    if (lower.includes('today') || lower.includes('മണിക്കൂർ') || lower.includes('hours') || lower.includes('expiring')) {
      return 'EXPIRING';
    }

    // Try parsing date
    const parsedDate = new Date(expiryDateStr);
    if (!isNaN(parsedDate.getTime())) {
      const now = new Date();
      const diffHours = (parsedDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (diffHours < 0) return 'EXPIRED';
      if (diffHours <= 12) return 'EXPIRING';
      return 'VALID';
    }
  } catch (e) {
    console.warn('Error parsing date:', e);
  }

  return 'VALID';
}

/**
 * Uploads a document file to Supabase Storage bucket 'documents'
 */
export async function uploadDocumentFile(file, userId = 'guest-driver') {
  if (!supabase) return { filePath: null, fileUrl: null, error: 'Supabase client not initialized' };

  const validation = validateDocumentFile(file);
  if (!validation.valid) {
    return { filePath: null, fileUrl: null, error: validation.error };
  }

  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${userId}/${Date.now()}_${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.warn('Supabase storage upload notice:', error.message);
      // Return synthetic URL for preview if bucket setup is pending
      return { 
        filePath, 
        fileUrl: URL.createObjectURL(file), 
        error: null 
      };
    }

    // Generate signed URL (since private bucket) or public URL
    const { data: signedData } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, 60 * 60 * 24); // 24 hours

    const fileUrl = signedData?.signedUrl || URL.createObjectURL(file);
    return { filePath, fileUrl, error: null };
  } catch (err) {
    console.warn('Upload error, continuing with local preview:', err);
    return { filePath: null, fileUrl: URL.createObjectURL(file), error: null };
  }
}

/**
 * Creates or updates a document record in public.documents
 */
export async function saveDocument(docData, userId = null) {
  if (!supabase) return null;

  try {
    const validityStatus = computeValidityStatus(docData.validityPeriod || docData.expiry_date);

    const record = {
      id: docData.id && docData.id.includes('-') && docData.id.length > 20 ? docData.id : undefined,
      user_id: userId || undefined,
      document_type: docData.documentType || 'E-Way Bill',
      document_number: docData.documentNumber || null,
      vehicle_number: docData.vehicleNumber || null,
      pickup_location: docData.pickupLocation || null,
      delivery_location: docData.deliveryLocation || null,
      consignor: docData.consignor || null,
      consignee: docData.consignee || null,
      cargo_description: docData.cargoDescription || null,
      quantity: docData.quantity || null,
      unit: docData.unit || null,
      weight: docData.weight || null,
      invoice_value: docData.invoiceValue || null,
      document_date: docData.documentDate || null,
      expiry_date: docData.validityPeriod || docData.expiry_date || null,
      transporter: docData.transporter || null,
      delivery_instructions: docData.deliveryInstructions || null,
      file_path: docData.filePath || null,
      file_url: docData.fileUrl || null,
      extracted_data: docData,
      malayalam_summary: docData.malayalamSummary || {},
      validity_status: validityStatus,
      status: docData.status || 'completed',
      updated_at: new Date().toISOString()
    };

    // Remove undefined keys
    Object.keys(record).forEach(k => record[k] === undefined && delete record[k]);

    const { data, error } = await supabase
      .from('documents')
      .upsert(record)
      .select()
      .single();

    if (error) {
      console.warn('Supabase document save notice:', error.message);
      return docData;
    }

    return { ...docData, ...data };
  } catch (err) {
    console.warn('Document save error:', err);
    return docData;
  }
}

/**
 * Fetches user's documents from public.documents
 */
export async function fetchUserDocuments(userId = null) {
  if (!supabase) return [];

  try {
    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Fetch documents notice:', error.message);
      return [];
    }

    // Transform database rows to standard LorryMitra document object format
    return (data || []).map(row => {
      const ext = row.extracted_data || {};
      return {
        id: row.id,
        isDemoPrimary: false,
        title: `${row.document_type}: ${row.cargo_description || 'Cargo'} (${row.pickup_location?.split(',')[0]} ➔ ${row.delivery_location?.split(',')[0]})`,
        documentType: row.document_type,
        documentNumber: row.document_number,
        documentDate: row.document_date || new Date(row.created_at).toLocaleDateString(),
        vehicleNumber: row.vehicle_number || 'N/A',
        pickupLocation: row.pickup_location || 'Kerala',
        pickupDetailedAddress: ext.pickupDetailedAddress || row.pickup_location,
        deliveryLocation: row.delivery_location || 'Kerala',
        deliveryDetailedAddress: ext.deliveryDetailedAddress || row.delivery_location,
        consignor: row.consignor,
        consignee: row.consignee,
        consigneePhone: ext.consigneePhone,
        cargoDescription: row.cargo_description || 'General Cargo',
        quantity: row.quantity,
        weight: row.weight,
        invoiceValue: row.invoice_value,
        transporter: row.transporter,
        validityPeriod: row.expiry_date,
        validityStatus: row.validity_status || computeValidityStatus(row.expiry_date),
        deliveryInstructions: row.delivery_instructions,
        malayalamSummary: row.malayalam_summary || ext.malayalamSummary || {},
        fileUrl: row.file_url,
        status: row.status,
        verifiedFacts: ext.verifiedFacts || {
          pickup: row.pickup_location,
          delivery: row.delivery_location,
          cargo: row.cargo_description,
          weight: row.weight,
          vehicle: row.vehicle_number,
          expiry: row.expiry_date
        }
      };
    });
  } catch (err) {
    console.warn('Fetch documents exception:', err);
    return [];
  }
}

/**
 * Deletes a document
 */
export async function deleteDocument(docId) {
  if (!supabase || !docId) return false;
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', docId);

    return !error;
  } catch (err) {
    console.warn('Delete document exception:', err);
    return false;
  }
}
