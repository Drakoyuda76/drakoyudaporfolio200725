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
      admin_action_logs: {
        Row: {
          action_type: string
          admin_id: string | null
          created_at: string | null
          description: string | null
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          target_id: string | null
          target_table: string
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          target_id?: string | null
          target_table: string
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          target_id?: string | null
          target_table?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_action_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          id: string
          is_active: boolean | null
          media_type: string | null
          media_url: string | null
          title: string
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          media_url?: string | null
          title: string
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          media_url?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          is_active: boolean | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          category: string | null
          description: string | null
          id: string
          is_public: boolean | null
          setting_key: string
          setting_value: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key: string
          setting_value: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          created_at: string | null
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          message_id: string
          ocr_text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          message_id: string
          ocr_text?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          message_id?: string
          ocr_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action_type: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          risk_level: string | null
          table_affected: string | null
          timestamp: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          risk_level?: string | null
          table_affected?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          risk_level?: string | null
          table_affected?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      balancetes: {
        Row: {
          created_at: string
          file_size: number
          file_type: string
          filename: string
          id: string
          original_name: string
          processed_data: Json | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size: number
          file_type: string
          filename: string
          id?: string
          original_name: string
          processed_data?: Json | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number
          file_type?: string
          filename?: string
          id?: string
          original_name?: string
          processed_data?: Json | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "balancetes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          ativo: boolean | null
          cor: string | null
          criado_em: string | null
          criado_por: string | null
          descricao: string | null
          icone: string | null
          id: string
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string | null
          icone?: string | null
          id?: string
          nome: string
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string | null
          icone?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_user: boolean
          message: string
          user_chatbot_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_user?: boolean
          message: string
          user_chatbot_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_user?: boolean
          message?: string
          user_chatbot_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_user_chatbot_id_fkey"
            columns: ["user_chatbot_id"]
            isOneToOne: false
            referencedRelation: "user_chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_settings: {
        Row: {
          background_type: string | null
          background_url: string | null
          background_value: string | null
          chatbot_id: string
          created_at: string | null
          id: string
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          background_type?: string | null
          background_url?: string | null
          background_value?: string | null
          chatbot_id: string
          created_at?: string | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          background_type?: string | null
          background_url?: string | null
          background_value?: string | null
          chatbot_id?: string
          created_at?: string | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chatbot_categories: {
        Row: {
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_customizations: {
        Row: {
          chatbot_id: string
          created_at: string | null
          custom_image_url: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chatbot_id: string
          created_at?: string | null
          custom_image_url?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chatbot_id?: string
          created_at?: string | null
          custom_image_url?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chatbot_embed_configs: {
        Row: {
          bubble_color: string | null
          bubble_position: string | null
          bubble_size: string | null
          created_at: string | null
          embed_style: Json | null
          header_config: Json | null
          id: string
          is_active: boolean | null
          placeholder_text: string | null
          updated_at: string | null
          user_chatbot_id: string | null
          welcome_message: string | null
        }
        Insert: {
          bubble_color?: string | null
          bubble_position?: string | null
          bubble_size?: string | null
          created_at?: string | null
          embed_style?: Json | null
          header_config?: Json | null
          id?: string
          is_active?: boolean | null
          placeholder_text?: string | null
          updated_at?: string | null
          user_chatbot_id?: string | null
          welcome_message?: string | null
        }
        Update: {
          bubble_color?: string | null
          bubble_position?: string | null
          bubble_size?: string | null
          created_at?: string | null
          embed_style?: Json | null
          header_config?: Json | null
          id?: string
          is_active?: boolean | null
          placeholder_text?: string | null
          updated_at?: string | null
          user_chatbot_id?: string | null
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_embed_configs_user_chatbot_id_fkey"
            columns: ["user_chatbot_id"]
            isOneToOne: true
            referencedRelation: "user_chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbots: {
        Row: {
          atualizado_em: string | null
          cabecalho_url: string | null
          categoria_id: string | null
          criado_em: string | null
          criado_por: string | null
          descricao: string
          icone_padrao: string | null
          icone_url: string | null
          id: string
          linguagem: string | null
          nome: string
          system_prompt: string
          uso_count: number | null
          visivel: boolean | null
        }
        Insert: {
          atualizado_em?: string | null
          cabecalho_url?: string | null
          categoria_id?: string | null
          criado_em?: string | null
          criado_por?: string | null
          descricao: string
          icone_padrao?: string | null
          icone_url?: string | null
          id?: string
          linguagem?: string | null
          nome: string
          system_prompt: string
          uso_count?: number | null
          visivel?: boolean | null
        }
        Update: {
          atualizado_em?: string | null
          cabecalho_url?: string | null
          categoria_id?: string | null
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string
          icone_padrao?: string | null
          icone_url?: string | null
          id?: string
          linguagem?: string | null
          nome?: string
          system_prompt?: string
          uso_count?: number | null
          visivel?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbots_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatbots_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbots_stats: {
        Row: {
          chatbot_id: string | null
          created_at: string | null
          id: string
          last_used_at: string | null
          total_messages: number | null
          total_sessions: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          chatbot_id?: string | null
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          total_messages?: number | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          chatbot_id?: string | null
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          total_messages?: number | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chatbots_stats_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      company_balance: {
        Row: {
          current_balance: number
          id: string
          last_updated: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          current_balance?: number
          id?: string
          last_updated?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          current_balance?: number
          id?: string
          last_updated?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      configuracoes_sistema: {
        Row: {
          atualizado_em: string | null
          atualizado_por: string | null
          categoria: string | null
          chave: string
          descricao: string | null
          id: string
          publico: boolean | null
          valor: Json
        }
        Insert: {
          atualizado_em?: string | null
          atualizado_por?: string | null
          categoria?: string | null
          chave: string
          descricao?: string | null
          id?: string
          publico?: boolean | null
          valor: Json
        }
        Update: {
          atualizado_em?: string | null
          atualizado_por?: string | null
          categoria?: string | null
          chave?: string
          descricao?: string | null
          id?: string
          publico?: boolean | null
          valor?: Json
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_sistema_atualizado_por_fkey"
            columns: ["atualizado_por"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      conversas: {
        Row: {
          id: string
          is_user: boolean
          mensagem: string
          status: string | null
          timestamp_msg: string | null
          user_chatbot_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_user: boolean
          mensagem: string
          status?: string | null
          timestamp_msg?: string | null
          user_chatbot_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_user?: boolean
          mensagem?: string
          status?: string | null
          timestamp_msg?: string | null
          user_chatbot_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversas_user_chatbot_id_fkey"
            columns: ["user_chatbot_id"]
            isOneToOne: false
            referencedRelation: "user_chatbots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      global_states: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          media_type: string | null
          media_url: string | null
          title: string
          views_count: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          media_url?: string | null
          title: string
          views_count?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          media_url?: string | null
          title?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "global_states_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      login2: {
        Row: {
          ativo: boolean | null
          criado_em: string | null
          criado_por: string | null
          email: string
          id: string
          nome: string | null
          senha: string
          theme_preference: string | null
          tipo_usuario: string | null
          ultimo_acesso: string | null
        }
        Insert: {
          ativo?: boolean | null
          criado_em?: string | null
          criado_por?: string | null
          email: string
          id?: string
          nome?: string | null
          senha: string
          theme_preference?: string | null
          tipo_usuario?: string | null
          ultimo_acesso?: string | null
        }
        Update: {
          ativo?: boolean | null
          criado_em?: string | null
          criado_por?: string | null
          email?: string
          id?: string
          nome?: string | null
          senha?: string
          theme_preference?: string | null
          tipo_usuario?: string | null
          ultimo_acesso?: string | null
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string | null
          id: string
          message_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      message_stats: {
        Row: {
          chatbot_id: string | null
          created_at: string | null
          date: string | null
          id: string
          message_count: number | null
          user_id: string | null
        }
        Insert: {
          chatbot_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          message_count?: number | null
          user_id?: string | null
        }
        Update: {
          chatbot_id?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          message_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_stats_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "system_chatbots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachment_type: string | null
          audio_duration_seconds: number | null
          audio_summary: string | null
          audio_transcription: string | null
          audio_url: string | null
          chatbot_id: string
          content: string
          created_at: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          ocr_text: string | null
          reactions: Json | null
          sender: string
          status: string | null
          user_id: string
        }
        Insert: {
          attachment_type?: string | null
          audio_duration_seconds?: number | null
          audio_summary?: string | null
          audio_transcription?: string | null
          audio_url?: string | null
          chatbot_id: string
          content: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          ocr_text?: string | null
          reactions?: Json | null
          sender: string
          status?: string | null
          user_id: string
        }
        Update: {
          attachment_type?: string | null
          audio_duration_seconds?: number | null
          audio_summary?: string | null
          audio_transcription?: string | null
          audio_url?: string | null
          chatbot_id?: string
          content?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          ocr_text?: string | null
          reactions?: Json | null
          sender?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          owner: string
          updated_at: string
          user_id: string
          value_kwanza: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner: string
          updated_at?: string
          user_id: string
          value_kwanza?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner?: string
          updated_at?: string
          user_id?: string
          value_kwanza?: number | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          ai_response: Json | null
          api_used: string | null
          balancete_id: string
          content: string
          created_at: string
          id: string
          report_type: string
          status: string
          title: string
          user_id: string
        }
        Insert: {
          ai_response?: Json | null
          api_used?: string | null
          balancete_id: string
          content: string
          created_at?: string
          id?: string
          report_type: string
          status?: string
          title: string
          user_id: string
        }
        Update: {
          ai_response?: Json | null
          api_used?: string | null
          balancete_id?: string
          content?: string
          created_at?: string
          id?: string
          report_type?: string
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_balancete_id_fkey"
            columns: ["balancete_id"]
            isOneToOne: false
            referencedRelation: "balancetes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      risky_operations: {
        Row: {
          amount: number
          approved_at: string | null
          created_at: string
          id: string
          operation_type: string
          operator_id: string
          risk_reason: string
          status: string
          supervisor_id: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          created_at?: string
          id?: string
          operation_type: string
          operator_id: string
          risk_reason: string
          status?: string
          supervisor_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          created_at?: string
          id?: string
          operation_type?: string
          operator_id?: string
          risk_reason?: string
          status?: string
          supervisor_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risky_operations_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessoes_ativas: {
        Row: {
          email: string | null
          expira_em: string | null
          id: string
          iniciado_em: string | null
          token_sessao: string | null
          usuario_id: string | null
        }
        Insert: {
          email?: string | null
          expira_em?: string | null
          id?: string
          iniciado_em?: string | null
          token_sessao?: string | null
          usuario_id?: string | null
        }
        Update: {
          email?: string | null
          expira_em?: string | null
          id?: string
          iniciado_em?: string | null
          token_sessao?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_ativas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      solutions: {
        Row: {
          business_area_impact: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          human_impact: string | null
          id: string
          images: string[] | null
          problem_solution: string | null
          sdg_goals: number[] | null
          status: string | null
          subtitle: string | null
          sustainability_impact: string | null
          times_saved: string | null
          title: string
          updated_at: string | null
          users_impacted: string | null
        }
        Insert: {
          business_area_impact?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          human_impact?: string | null
          id?: string
          images?: string[] | null
          problem_solution?: string | null
          sdg_goals?: number[] | null
          status?: string | null
          subtitle?: string | null
          sustainability_impact?: string | null
          times_saved?: string | null
          title: string
          updated_at?: string | null
          users_impacted?: string | null
        }
        Update: {
          business_area_impact?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          human_impact?: string | null
          id?: string
          images?: string[] | null
          problem_solution?: string | null
          sdg_goals?: number[] | null
          status?: string | null
          subtitle?: string | null
          sustainability_impact?: string | null
          times_saved?: string | null
          title?: string
          updated_at?: string | null
          users_impacted?: string | null
        }
        Relationships: []
      }
      state_views: {
        Row: {
          id: string
          state_id: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          state_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          state_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "state_views_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "global_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "state_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      supervisor_approvals: {
        Row: {
          amount: number
          approved_at: string | null
          created_at: string
          id: string
          operator_id: string
          operator_name: string
          product: string
          reason: string | null
          status: string
          supervisor_email: string
          transaction_id: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          created_at?: string
          id?: string
          operator_id: string
          operator_name: string
          product: string
          reason?: string | null
          status?: string
          supervisor_email: string
          transaction_id: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          created_at?: string
          id?: string
          operator_id?: string
          operator_name?: string
          product?: string
          reason?: string | null
          status?: string
          supervisor_email?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supervisor_approvals_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      system_announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          media_type: string | null
          media_url: string | null
          send_to_all: boolean | null
          title: string
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          media_url?: string | null
          send_to_all?: boolean | null
          title: string
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          media_type?: string | null
          media_url?: string | null
          send_to_all?: boolean | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      system_chatbots: {
        Row: {
          avatar: string | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          language: string | null
          name: string
          system_prompt: string | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          avatar?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          name: string
          system_prompt?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          avatar?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          name?: string
          system_prompt?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "system_chatbots_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "chatbot_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "system_chatbots_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      system_config: {
        Row: {
          config_key: string
          config_value: Json
          description: string | null
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          description?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          description?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_config_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_stats: {
        Row: {
          active_chatbots: number | null
          active_users_today: number | null
          id: string
          messages_today: number | null
          new_users_today: number | null
          total_chatbots: number | null
          total_messages: number | null
          total_users: number | null
          updated_at: string | null
        }
        Insert: {
          active_chatbots?: number | null
          active_users_today?: number | null
          id?: string
          messages_today?: number | null
          new_users_today?: number | null
          total_chatbots?: number | null
          total_messages?: number | null
          total_users?: number | null
          updated_at?: string | null
        }
        Update: {
          active_chatbots?: number | null
          active_users_today?: number | null
          id?: string
          messages_today?: number | null
          new_users_today?: number | null
          total_chatbots?: number | null
          total_messages?: number | null
          total_users?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          description: string | null
          id: string
          needs_approval: boolean | null
          product: string
          quantity: number
          status: string
          timestamp: string
          total_value: number
          type: string
          unit_price: number
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          description?: string | null
          id?: string
          needs_approval?: boolean | null
          product: string
          quantity?: number
          status?: string
          timestamp?: string
          total_value: number
          type: string
          unit_price: number
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          description?: string | null
          id?: string
          needs_approval?: boolean | null
          product?: string
          quantity?: number
          status?: string
          timestamp?: string
          total_value?: number
          type?: string
          unit_price?: number
          user_id?: string
        }
        Relationships: []
      }
      user_access_levels: {
        Row: {
          access_level: string
          granted_at: string
          granted_by: string | null
          id: string
          is_active: boolean
          user_id: string
        }
        Insert: {
          access_level: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          user_id: string
        }
        Update: {
          access_level?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          user_id?: string
        }
        Relationships: []
      }
      user_announcements: {
        Row: {
          announcement_id: string | null
          created_at: string | null
          id: string
          read_at: string | null
          user_id: string | null
        }
        Insert: {
          announcement_id?: string | null
          created_at?: string | null
          id?: string
          read_at?: string | null
          user_id?: string | null
        }
        Update: {
          announcement_id?: string | null
          created_at?: string | null
          id?: string
          read_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_announcements_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "system_announcements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_announcements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      user_audio_messages: {
        Row: {
          audio_url: string
          chatbot_id: string
          created_at: string
          duration_seconds: number | null
          file_size_bytes: number | null
          id: string
          message_id: string
          summary: string | null
          transcription: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_url: string
          chatbot_id: string
          created_at?: string
          duration_seconds?: number | null
          file_size_bytes?: number | null
          id?: string
          message_id: string
          summary?: string | null
          transcription?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_url?: string
          chatbot_id?: string
          created_at?: string
          duration_seconds?: number | null
          file_size_bytes?: number | null
          id?: string
          message_id?: string
          summary?: string | null
          transcription?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_chatbot_settings: {
        Row: {
          background_type: string | null
          background_value: string | null
          chatbot_id: string
          conversation_background_type: string | null
          conversation_background_value: string | null
          created_at: string | null
          custom_avatar_url: string | null
          custom_name: string | null
          header_background_type: string | null
          header_background_value: string | null
          header_image_url: string | null
          icon_url: string | null
          id: string
          message_ttl: number | null
          mode: string | null
          system_prompt_custom: string | null
          theme_mode: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          background_type?: string | null
          background_value?: string | null
          chatbot_id: string
          conversation_background_type?: string | null
          conversation_background_value?: string | null
          created_at?: string | null
          custom_avatar_url?: string | null
          custom_name?: string | null
          header_background_type?: string | null
          header_background_value?: string | null
          header_image_url?: string | null
          icon_url?: string | null
          id?: string
          message_ttl?: number | null
          mode?: string | null
          system_prompt_custom?: string | null
          theme_mode?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          background_type?: string | null
          background_value?: string | null
          chatbot_id?: string
          conversation_background_type?: string | null
          conversation_background_value?: string | null
          created_at?: string | null
          custom_avatar_url?: string | null
          custom_name?: string | null
          header_background_type?: string | null
          header_background_value?: string | null
          header_image_url?: string | null
          icon_url?: string | null
          id?: string
          message_ttl?: number | null
          mode?: string | null
          system_prompt_custom?: string | null
          theme_mode?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_chatbot_uso: {
        Row: {
          data_uso: string | null
          id: string
          mensagens_enviadas: number | null
          mensagens_recebidas: number | null
          tempo_total_uso: number | null
          total_acessos: number | null
          ultima_interacao: string | null
          user_chatbot_id: string | null
        }
        Insert: {
          data_uso?: string | null
          id?: string
          mensagens_enviadas?: number | null
          mensagens_recebidas?: number | null
          tempo_total_uso?: number | null
          total_acessos?: number | null
          ultima_interacao?: string | null
          user_chatbot_id?: string | null
        }
        Update: {
          data_uso?: string | null
          id?: string
          mensagens_enviadas?: number | null
          mensagens_recebidas?: number | null
          tempo_total_uso?: number | null
          total_acessos?: number | null
          ultima_interacao?: string | null
          user_chatbot_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_chatbot_uso_user_chatbot_id_fkey"
            columns: ["user_chatbot_id"]
            isOneToOne: false
            referencedRelation: "user_chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      user_chatbots: {
        Row: {
          cabecalho_url_personalizado: string | null
          chatbot_id: string
          created_at: string | null
          custom_avatar: string | null
          custom_description: string | null
          custom_name: string | null
          custom_system_prompt: string | null
          descricao_personalizada: string | null
          embed_ativo: boolean | null
          embed_config: Json | null
          icone_cabecalho: string | null
          icone_conversa: string | null
          icone_url_personalizado: string | null
          id: string
          last_message: string | null
          last_message_time: string | null
          nome_personalizado: string | null
          system_prompt_personalizado: string | null
          unread_count: number | null
          updated_at: string | null
          url_treinamento: string | null
          user_id: string
        }
        Insert: {
          cabecalho_url_personalizado?: string | null
          chatbot_id: string
          created_at?: string | null
          custom_avatar?: string | null
          custom_description?: string | null
          custom_name?: string | null
          custom_system_prompt?: string | null
          descricao_personalizada?: string | null
          embed_ativo?: boolean | null
          embed_config?: Json | null
          icone_cabecalho?: string | null
          icone_conversa?: string | null
          icone_url_personalizado?: string | null
          id?: string
          last_message?: string | null
          last_message_time?: string | null
          nome_personalizado?: string | null
          system_prompt_personalizado?: string | null
          unread_count?: number | null
          updated_at?: string | null
          url_treinamento?: string | null
          user_id: string
        }
        Update: {
          cabecalho_url_personalizado?: string | null
          chatbot_id?: string
          created_at?: string | null
          custom_avatar?: string | null
          custom_description?: string | null
          custom_name?: string | null
          custom_system_prompt?: string | null
          descricao_personalizada?: string | null
          embed_ativo?: boolean | null
          embed_config?: Json | null
          icone_cabecalho?: string | null
          icone_conversa?: string | null
          icone_url_personalizado?: string | null
          id?: string
          last_message?: string | null
          last_message_time?: string | null
          nome_personalizado?: string | null
          system_prompt_personalizado?: string | null
          unread_count?: number | null
          updated_at?: string | null
          url_treinamento?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_chatbots_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_chatbots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      user_embeds: {
        Row: {
          ativo: boolean | null
          config: Json | null
          created_at: string | null
          dominio_permitido: string | null
          embed_code: string
          embed_id: string | null
          id: string
          is_active: boolean | null
          total_interacoes: number | null
          ultimo_uso: string | null
          user_chatbot_id: string
          user_id: string
        }
        Insert: {
          ativo?: boolean | null
          config?: Json | null
          created_at?: string | null
          dominio_permitido?: string | null
          embed_code: string
          embed_id?: string | null
          id?: string
          is_active?: boolean | null
          total_interacoes?: number | null
          ultimo_uso?: string | null
          user_chatbot_id: string
          user_id: string
        }
        Update: {
          ativo?: boolean | null
          config?: Json | null
          created_at?: string | null
          dominio_permitido?: string | null
          embed_code?: string
          embed_id?: string | null
          id?: string
          is_active?: boolean | null
          total_interacoes?: number | null
          ultimo_uso?: string | null
          user_chatbot_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_embeds_user_chatbot_id_fkey"
            columns: ["user_chatbot_id"]
            isOneToOne: false
            referencedRelation: "user_chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          created_at: string
          enabled: boolean
          feature_key: string
          id: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          feature_key: string
          id?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          feature_key?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          id: string
          ip_address: string | null
          is_active: boolean
          login_time: string
          logout_time: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          id?: string
          ip_address?: string | null
          is_active?: boolean
          login_time?: string
          logout_time?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          id?: string
          ip_address?: string | null
          is_active?: boolean
          login_time?: string
          logout_time?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          id: string
          theme_mode: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          theme_mode?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          theme_mode?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string | null
          id: string
          last_activity: string | null
          total_chatbots: number | null
          total_messages: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          total_chatbots?: number | null
          total_messages?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          total_chatbots?: number | null
          total_messages?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "login2"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          password_hash: string
          role: string
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          password_hash: string
          role?: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          password_hash?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      chatbot_has_image: {
        Args: { chatbot_id: string; user_id?: string }
        Returns: boolean
      }
      cleanup_expired_messages: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_temporary_messages: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      criar_sessao: {
        Args: { p_usuario_id: string; p_email: string }
        Returns: string
      }
      gerar_embed_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_chatbot_display_image: {
        Args: { chatbot_id: string; user_id?: string }
        Returns: string
      }
      get_current_custom_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      incrementar_estatisticas_conversa: {
        Args: { p_user_chatbot_id: string; p_is_user_message: boolean }
        Returns: undefined
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          p_admin_id: string
          p_action_type: string
          p_target_table: string
          p_target_id: string
          p_old_values?: Json
          p_new_values?: Json
          p_description?: string
        }
        Returns: string
      }
      log_audit_action: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_table_affected: string
          p_record_id?: string
          p_old_data?: Json
          p_new_data?: Json
          p_risk_level?: string
        }
        Returns: string
      }
      populate_test_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_system_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_system_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_system_stats_real: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_stats: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      user_has_access: {
        Args: { p_user_id: string; p_access_level: string }
        Returns: boolean
      }
      user_has_permission: {
        Args: { p_user_id: string; p_feature_key: string }
        Returns: boolean
      }
      user_has_permission_strict: {
        Args: { p_user_id: string; p_feature_key: string }
        Returns: boolean
      }
      verificar_login: {
        Args: { email_input: string; senha_input: string }
        Returns: {
          sucesso: boolean
          usuario_id: string
          email: string
          nome: string
          tipo_usuario: string
          mensagem: string
        }[]
      }
      verificar_sessao: {
        Args: { p_token: string }
        Returns: {
          valida: boolean
          usuario_id: string
          email: string
          tipo_usuario: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
