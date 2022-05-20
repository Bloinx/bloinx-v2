import { createClient } from "@supabase/supabase-js";

// const options = {
//   schema: "public",
//   headers: { "x-my-custom-header": "Bloinx" },
//   autoRefreshToken: true,
//   persistSession: true,
//   detectSessionInUrl: true,
// };
// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6d2toZGJlcXZpaWtua3N4bnFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTAwNjY4NjcsImV4cCI6MTk2NTY0Mjg2N30.S5IdfT-n5ZvogOJFrh0S9XgoYTgElt9mZ2HezCeMdiw';
// const supabaseUrl = 'https://izwkhdbeqviiknksxnqb.supabase.co'
// const supabase = createClient( supabaseUrl, SUPABASE_KEY );
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Ym55a3J4a3Z6ZXpuYmthYmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwNTE1NDYsImV4cCI6MTk2MjYyNzU0Nn0.sYQORhuTMuDepj2D1BOBSm51UWJg4XadeA8tZ9ZEm_0'
const SUPABASE_URL = "https://axbnykrxkvzeznbkabkx.supabase.co"

const supabase = createClient(SUPABASE_URL,SUPABASE_KEY);
export default supabase;
