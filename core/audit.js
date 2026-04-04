// core/audit.js
// Supabase-backed audit logger using audit_logs table.

const { getClient } = require('./db');

async function log(action, details = {}) {
  try {
    const client = getClient();
    if (!client) {
      console.error('Supabase client not initialized for audit log');
      return null;
    }

    const { data, error } = await client
      .from('audit_logs')
      .insert({ action, details })
      .select()
      .single();

    if (error) {
      console.error('Failed to log audit entry', error);
      return null;
    }

    return {
      id: data.id,
      action: data.action,
      details: data.details,
      when: data.created_at
    };
  } catch (err) {
    console.error('Audit log error', err);
    return null;
  }
}

async function list() {
  try {
    const client = getClient();
    if (!client) throw new Error('Supabase client not initialized');

    const { data, error } = await client
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw new Error(error.message);

    return data.map(d => ({
      id: d.id,
      action: d.action,
      details: d.details,
      when: d.created_at
    }));
  } catch (err) {
    console.error('Failed to fetch audit logs', err);
    return [];
  }
}

async function clear() {
  try {
    const client = getClient();
    if (!client) throw new Error('Supabase client not initialized');

    const { error } = await client
      .from('audit_logs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (error) throw new Error(error.message);
    return true;
  } catch (err) {
    console.error('Failed to clear audit logs', err);
    return false;
  }
}

module.exports = { log, list, clear };
