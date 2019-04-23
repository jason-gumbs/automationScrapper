CREATE TABLE crane_audit_log (
  trans_id STRING(MAX) NOT NULL,
  application STRING(MAX) NOT NULL,
  create_date_time TIMESTAMP NOT NULL,
  instance STRING(MAX) NOT NULL,
  query STRING(MAX) NOT NULL,
  query_type STRING(MAX) NOT NULL,
  reason STRING(MAX) NOT NULL,
  status STRING(MAX) NOT NULL,
  version STRING(MAX) NOT NULL,
) PRIMARY KEY (trans_id)

CREATE UNIQUE INDEX trans_id_idx ON crane_audit_log(trans_id);
