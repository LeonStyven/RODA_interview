-- sql/01_schema_seed.sql
CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.clientes (
  cliente_id   BIGSERIAL PRIMARY KEY,
  tipo_doc     TEXT NOT NULL,
  num_doc      TEXT NOT NULL,
  nombre       TEXT NOT NULL,
  ciudad       TEXT,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tipo_doc, num_doc)
);

CREATE TABLE IF NOT EXISTS core.creditos (
  credito_id   BIGSERIAL PRIMARY KEY,
  cliente_id   BIGINT NOT NULL REFERENCES core.clientes(cliente_id),
  producto     TEXT NOT NULL,                  -- e-bike, e-moped
  inversion    NUMERIC(12,2) NOT NULL,
  cuotas_totales INT NOT NULL,
  tea          NUMERIC(8,6) NOT NULL,
  fecha_desembolso DATE NOT NULL,
  fecha_inicio_pago DATE NOT NULL,
  estado       TEXT NOT NULL DEFAULT 'vigente'  -- vigente|cancelado|castigado
);

CREATE TABLE IF NOT EXISTS core.payment_schedule (
  schedule_id  BIGSERIAL PRIMARY KEY,
  credito_id   BIGINT NOT NULL REFERENCES core.creditos(credito_id),
  num_cuota    INT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  valor_cuota  NUMERIC(12,2) NOT NULL,
  estado       TEXT NOT NULL DEFAULT 'pendiente', -- pendiente|parcial|pagada|vencida
  UNIQUE (credito_id, num_cuota)
);

CREATE TABLE IF NOT EXISTS core.pagos (
  pago_id      BIGSERIAL PRIMARY KEY,
  schedule_id  BIGINT NOT NULL REFERENCES core.payment_schedule(schedule_id),
  fecha_pago   TIMESTAMPTZ NOT NULL,
  monto        NUMERIC(12,2) NOT NULL,
  medio        TEXT
);

-- Índices mínimos
CREATE INDEX IF NOT EXISTS ix_ps_credito_cuota ON core.payment_schedule(credito_id, num_cuota);
CREATE INDEX IF NOT EXISTS ix_pagos_schedule_fecha ON core.pagos(schedule_id, fecha_pago);
