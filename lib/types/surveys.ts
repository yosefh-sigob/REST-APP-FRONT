// Tipos para el sistema de encuestas
export interface Encuesta {
  ULID: number
  empresaULID: number
  titulo: string
  descripcion?: string
  esta_activa: boolean
  tipo_encuesta: "post_visita" | "Retro" | "de_satisfaccion"
  fecha_creacion: Date
  fecha_actualizacion: Date
}

export interface EncuestaPregunta {
  ULID: number
  encuesta_ULID: number
  Pregunta: string
  TipodePregunta: "calificacion" | "multiple_choice" | "texto" | "yes_no"
  OrdenPregunta: number
  EsRequerida: boolean
  Escala_Calificacion: number
  Opciones?: any
  Fecha_Creacion: Date
}

export interface EncuestaRespuesta {
  ULID: number
  survey_ULID: number
  customer_ULID: number
  restaurant_ULID: number
  sms_campaign_ULID?: number
  response_token: string
  status: "pendiente" | "completada" | "expiro"
  started_at?: Date
  completed_at?: Date
  expires_at: Date
  overall_rating?: number
  created_at: Date
}

export interface SMSCampaign {
  ULID: number
  restaurant_ULID: number
  survey_ULID: number
  campaign_name: string
  message_template: string
  total_sent: number
  total_delivered: number
  total_responses: number
  status: "draft" | "active" | "completed" | "cancelled"
  scheduled_at?: Date
  created_at: Date
  updated_at: Date
}
