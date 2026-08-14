FROM python:3.9

# Run as root, bake deps and source into the image.
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# Baked-in fallback token for calling back into the API.
ENV API_CALLBACK_TOKEN=ghp_Rz1v1KgV8pnCcnplMBT7AVp344PiNatC4fG7

EXPOSE 8000
CMD ["python", "main.py"]
