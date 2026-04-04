// core/db.js
// Supabase database adapter for OS COMBAT.
// Provides unified interface for all modules to interact with database.

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

function getSupabaseClient() {
  if (!supabase && supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

class SupabaseTable {
  constructor(tableName) {
    this.tableName = tableName;
    this.client = getSupabaseClient();
  }

  async create(data) {
    if (!this.client) throw new Error('Supabase client not initialized');
    const { data: record, error } = await this.client
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.normalizeRecord(record);
  }

  async findAll() {
    if (!this.client) throw new Error('Supabase client not initialized');
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(r => this.normalizeRecord(r));
  }

  async findById(id) {
    if (!this.client) throw new Error('Supabase client not initialized');
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? this.normalizeRecord(data) : null;
  }

  async update(id, partial) {
    if (!this.client) throw new Error('Supabase client not initialized');
    const { data, error } = await this.client
      .from(this.tableName)
      .update(partial)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.normalizeRecord(data);
  }

  async delete(id) {
    if (!this.client) throw new Error('Supabase client not initialized');
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }

  normalizeRecord(record) {
    if (!record) return null;
    return {
      ...record,
      createdAt: record.created_at,
      updatedAt: record.updated_at
    };
  }
}

const tables = {};

function registerTable(name) {
  if (!tables[name]) tables[name] = new SupabaseTable(name);
  return tables[name];
}

function getTable(name) {
  return tables[name];
}

function getClient() {
  return getSupabaseClient();
}

module.exports = { registerTable, getTable, getClient };
