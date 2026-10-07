import { supabase } from '../utils/supabase';

/**
 * Fetch deliveries for authenticated user
 */
export async function fetchDeliveries(userId = null) {
  if (!supabase) return [];

  try {
    let query = supabase
      .from('deliveries')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Fetch deliveries notice:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('Fetch deliveries error:', err);
    return [];
  }
}

/**
 * Add a new delivery
 */
export async function addDelivery(deliveryData, userId = null) {
  if (!supabase) return null;

  try {
    const payload = {
      user_id: userId || undefined,
      document_id: deliveryData.document_id || deliveryData.documentId || null,
      pickup: deliveryData.pickup,
      destination: deliveryData.destination,
      customer: deliveryData.customer || '',
      cargo: deliveryData.cargo || '',
      vehicle: deliveryData.vehicle || '',
      status: deliveryData.status || 'In Transit',
      delivery_date: deliveryData.delivery_date || deliveryData.deliveryDate || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('deliveries')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.warn('Add delivery notice:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Add delivery error:', err);
    return null;
  }
}

/**
 * Update delivery status (Pending | In Transit | Delivered | Cancelled)
 */
export async function updateDeliveryStatus(id, newStatus) {
  if (!supabase || !id) return null;

  try {
    const { data, error } = await supabase
      .from('deliveries')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Update delivery status error:', err);
    return null;
  }
}

/**
 * Delete a delivery
 */
export async function deleteDelivery(id) {
  if (!supabase || !id) return false;

  try {
    const { error } = await supabase
      .from('deliveries')
      .delete()
      .eq('id', id);

    return !error;
  } catch (err) {
    console.warn('Delete delivery error:', err);
    return false;
  }
}
