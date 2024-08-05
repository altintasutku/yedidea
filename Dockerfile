# Base image olarak Bun'u kullanıyoruz
FROM oven/bun:latest

# Çalışma dizinini ayarlıyoruz
WORKDIR /app

# Proje dosyalarını container'a kopyalıyoruz
COPY . .

# Bağımlılıkları temiz bir şekilde yüklüyoruz
RUN bun install --no-cache

# Drizzle komutlarını çalıştırıyoruz
RUN bun run generate && echo "Generate completed."
RUN bun run migrate && echo "Migrate completed."

# Uygulamayı başlatıyoruz
CMD ["bun", "run", "start"]
