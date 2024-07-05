# Đầu tiên, sử dụng một image node để xây dựng ứng dụng
FROM node:18 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Bây giờ, sử dụng một image nginx để phục vụ ứng dụng
FROM nginx:alpine

# Sao chép file build từ giai đoạn trước vào nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy nginx khi container bắt đầu
CMD ["nginx", "-g", "daemon off;"]
