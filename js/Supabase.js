import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://iqgdiyzueumqcztlkmto.supabase.co";

const SUPABASE_KEY = "sb_publishable_JSPv7T4sd0K0z1yOYPQQjQ_qcFCWyAy";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

export async function BuscarRanking() {
    const { data, error } = await supabase
        .from("jogadores")
        .select("nome, melhor_pontos")
        .gt("melhor_pontos", 1500)
        .order("melhor_pontos", {
            ascending: false
        })
        .limit(100);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}