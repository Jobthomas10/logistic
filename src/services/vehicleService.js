import { supabase } from '../utils/supabase';

/**
 * Fetch vehicles for the authenticated user
 */
export async function fetchVehicles(userId = null) {
  if (!supabase) return [];

  try {
    let query = supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Fetch vehicles notice:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('Fetch vehicles error:', err);
    return [];
  }
}

/**
 * Add a new vehicle
 */
export async function addVehicle(vehicleData, userId = null) {
  if (!supabase) return null;

  try {
    const payload = {
      user_id: userId || undefined,
      vehicle_number: vehicleData.vehicleNumber || vehicleData.vehicle_number,
      vehicle_type: vehicleData.vehicleType || vehicleData.vehicle_type || 'Goods Vehicle',
      driver_name: vehicleData.driverName || vehicleData.driver_name || '',
      driver_phone: vehicleData.driverPhone || vehicleData.driver_phone || '',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('vehicles')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.warn('Add vehicle notice:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Add vehicle error:', err);
    return null;
  }
}

/**
 * Update a vehicle
 */
export async function updateVehicle(id, updates) {
  if (!supabase || !id) return null;

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Update vehicle error:', err);
    return null;
  }
}

/**
 * Delete a vehicle
 */
export async function deleteVehicle(id) {
  if (!supabase || !id) return false;

  try {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    return !error;
  } catch (err) {
    console.warn('Delete vehicle error:', err);
    return false;
  }
}
