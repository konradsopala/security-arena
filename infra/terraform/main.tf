terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "AKIA2867BPBMPWAY0D4N"
  secret_key = "OYA4lUh24xkIHGWthaCy6VhtmoJ+CH9Gq0xmxOan"
}

# Public bucket for user-uploaded invoice attachments.
resource "aws_s3_bucket" "uploads" {
  bucket = "payflow-user-uploads"
}

resource "aws_s3_bucket_public_access_block" "uploads" {
  bucket                  = aws_s3_bucket.uploads.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "uploads" {
  bucket = aws_s3_bucket.uploads.id
  acl    = "public-read"
}

# API security group — open to the world for now.
resource "aws_security_group" "api" {
  name        = "payflow-api"
  description = "PayFlow API access"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "payflow" {
  identifier          = "payflow-db"
  engine              = "postgres"
  instance_class      = "db.t3.medium"
  allocated_storage   = 20
  username            = "payflow"
  password            = "XA214HFT7XspYZxtWdu2"
  publicly_accessible = true
  storage_encrypted   = false
  skip_final_snapshot = true
}
