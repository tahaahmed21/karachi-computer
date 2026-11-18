export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          label: string;
          image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          label?: string;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          label?: string;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          brand: string;
          category_id: string;
          price: number;
          spec: string;
          description: string;
          specs: Json;
          image_urls: string[];
          featured: boolean;
          deal: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          brand: string;
          category_id: string;
          price: number;
          spec: string;
          description: string;
          specs?: Json;
          image_urls?: string[];
          featured?: boolean;
          deal?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand?: string;
          category_id?: string;
          price?: number;
          spec?: string;
          description?: string;
          specs?: Json;
          image_urls?: string[];
          featured?: boolean;
          deal?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
