// lib/toolsService.js

import { supabase } from './supabase';

// ==================== GET ====================
export async function getToolsByKategori(kategori) {
    try {
        const { data, error } = await supabase
            .from('toolsmilling')
            .select('*')
            .eq('kategori', kategori)
            .order('nama_item', { ascending: true });

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error get tools:', err.message);
        return [];
    }
}

export async function getAllTools() {
    try {
        const { data, error } = await supabase
            .from('toolsmilling')
            .select('*')
            .order('kategori', { ascending: true });

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error get all tools:', err.message);
        return [];
    }
}

// ==================== CREATE ====================
export async function addTool(toolData) {
    try {
        const { data, error } = await supabase
            .from('toolsmilling')
            .insert([toolData])
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Error add tool:', err.message);
        return { success: false, error: err.message };
    }
}

// ==================== UPDATE ====================
export async function updateTool(id, toolData) {
    try {
        const { data, error } = await supabase
            .from('toolsmilling')
            .update(toolData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Error update tool:', err.message);
        return { success: false, error: err.message };
    }
}

// Update jumlah stok saja
export async function updateStok(id, jumlahBaru) {
    try {
        const { data, error } = await supabase
            .from('toolsmilling')
            .update({ jumlah: jumlahBaru })
            .eq('id', id)
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error('Error update stok:', err.message);
        return { success: false, error: err.message };
    }
}

// ==================== DELETE ====================
export async function deleteTool(id) {
    try {
        const { error } = await supabase
            .from('toolsmilling')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (err) {
        console.error('Error delete tool:', err.message);
        return { success: false, error: err.message };
    }
}