export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_email: string
          created_at: string
          details: Json | null
          id: string
          record_id: string | null
          table_name: string | null
        }
        Insert: {
          action: string
          admin_email: string
          created_at?: string
          details?: Json | null
          id?: string
          record_id?: string | null
          table_name?: string | null
        }
        Update: {
          action?: string
          admin_email?: string
          created_at?: string
          details?: Json | null
          id?: string
          record_id?: string | null
          table_name?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          name: string
          password_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          name: string
          password_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          password_hash?: string
        }
        Relationships: []
      }
      app_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          password_hash: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          password_hash: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
      contacto: {
        Row: {
          email_geral: string | null
          email_parcerias: string | null
          endereco: string | null
          id: string
          linkedin_url: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          email_geral?: string | null
          email_parcerias?: string | null
          endereco?: string | null
          id?: string
          linkedin_url?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          email_geral?: string | null
          email_parcerias?: string | null
          endereco?: string | null
          id?: string
          linkedin_url?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      diagnostic_steps: {
        Row: {
          completed_at: string | null
          created_at: string | null
          email: string
          financial_challenges: string[] | null
          financial_goals: string[] | null
          id: string
          is_viewed: boolean | null
          monthly_income: number
          motivation_level: number | null
          name: string
          phone: string | null
          status: string | null
          time_spent_seconds: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          email: string
          financial_challenges?: string[] | null
          financial_goals?: string[] | null
          id?: string
          is_viewed?: boolean | null
          monthly_income: number
          motivation_level?: number | null
          name: string
          phone?: string | null
          status?: string | null
          time_spent_seconds?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          email?: string
          financial_challenges?: string[] | null
          financial_goals?: string[] | null
          id?: string
          is_viewed?: boolean | null
          monthly_income?: number
          motivation_level?: number | null
          name?: string
          phone?: string | null
          status?: string | null
          time_spent_seconds?: number | null
        }
        Relationships: []
      }
      diagnostics: {
        Row: {
          challenges: string[] | null
          completed_at: string | null
          contact: string | null
          created_at: string | null
          goals: string[] | null
          id: string
          income: number | null
          motivation_score: number | null
          name: string | null
          status: string | null
          time_spent_seconds: number | null
          user_id: string | null
        }
        Insert: {
          challenges?: string[] | null
          completed_at?: string | null
          contact?: string | null
          created_at?: string | null
          goals?: string[] | null
          id?: string
          income?: number | null
          motivation_score?: number | null
          name?: string | null
          status?: string | null
          time_spent_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          challenges?: string[] | null
          completed_at?: string | null
          contact?: string | null
          created_at?: string | null
          goals?: string[] | null
          id?: string
          income?: number | null
          motivation_score?: number | null
          name?: string | null
          status?: string | null
          time_spent_seconds?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      estatisticas: {
        Row: {
          id: string
          parcerias_ativas: number | null
          solucoes_ativas: number | null
          total_horas_poupadas: number | null
          total_solucoes: number | null
          total_utilizadores_impactados: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          parcerias_ativas?: number | null
          solucoes_ativas?: number | null
          total_horas_poupadas?: number | null
          total_solucoes?: number | null
          total_utilizadores_impactados?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          parcerias_ativas?: number | null
          solucoes_ativas?: number | null
          total_horas_poupadas?: number | null
          total_solucoes?: number | null
          total_utilizadores_impactados?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          title: string
          type: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          type: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      solucoes: {
        Row: {
          business_area_impact: string[] | null
          created_at: string
          description: string
          human_impact: string | null
          icon_url: string | null
          id: string
          images_urls: string[] | null
          problem_solution: string | null
          sdg_goals: number[] | null
          status: Database["public"]["Enums"]["solution_status"]
          subtitle: string
          sustainability_impact: string | null
          times_saved: number | null
          title: string
          updated_at: string
          users_impacted: number | null
        }
        Insert: {
          business_area_impact?: string[] | null
          created_at?: string
          description: string
          human_impact?: string | null
          icon_url?: string | null
          id?: string
          images_urls?: string[] | null
          problem_solution?: string | null
          sdg_goals?: number[] | null
          status?: Database["public"]["Enums"]["solution_status"]
          subtitle: string
          sustainability_impact?: string | null
          times_saved?: number | null
          title: string
          updated_at?: string
          users_impacted?: number | null
        }
        Update: {
          business_area_impact?: string[] | null
          created_at?: string
          description?: string
          human_impact?: string | null
          icon_url?: string | null
          id?: string
          images_urls?: string[] | null
          problem_solution?: string | null
          sdg_goals?: number[] | null
          status?: Database["public"]["Enums"]["solution_status"]
          subtitle?: string
          sustainability_impact?: string | null
          times_saved?: number | null
          title?: string
          updated_at?: string
          users_impacted?: number | null
        }
        Relationships: []
      }
      valores_empresa: {
        Row: {
          fundacao_ano: number | null
          historia: string | null
          id: string
          missao: string | null
          updated_at: string
          valores: string[] | null
          visao: string | null
        }
        Insert: {
          fundacao_ano?: number | null
          historia?: string | null
          id?: string
          missao?: string | null
          updated_at?: string
          valores?: string[] | null
          visao?: string | null
        }
        Update: {
          fundacao_ano?: number | null
          historia?: string | null
          id?: string
          missao?: string | null
          updated_at?: string
          valores?: string[] | null
          visao?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_credentials: {
        Args: { input_email: string; input_password: string }
        Returns: boolean
      }
      check_user_credentials: {
        Args: { input_username: string; input_password: string }
        Returns: string
      }
    }
    Enums: {
      solution_status:
        | "live"
        | "parceria"
        | "prototipo"
        | "teste-usuarios"
        | "conceito"
        | "teste-convite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      solution_status: [
        "live",
        "parceria",
        "prototipo",
        "teste-usuarios",
        "conceito",
        "teste-convite",
      ],
    },
  },
} as const
