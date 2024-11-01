<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Buzz Chat - README</title>
</head>
<body>
  <h1>Buzz Chat</h1>
  <p><strong>Buzz Chat</strong> là một ứng dụng chat đơn giản, được xây dựng như một phần của môn học <em>Ứng Dụng 02</em> tại trường, dưới sự hướng dẫn của <strong>Giáo viên Huỳnh Phước Danh</strong>. Mục tiêu của dự án là tạo ra một ứng dụng nhắn tin trực tuyến giúp người dùng kết nối và chia sẻ dễ dàng, sử dụng <strong>Next.js</strong>, <strong>ShadCN</strong>, <strong>MongoDB</strong>, và <strong>Express</strong>.</p>

  <h2>📋 Mục Lục</h2>
  <ul>
    <li><a href="#gioi-thieu">Giới thiệu</a></li>
    <li><a href="#tinh-nang">Tính năng</a></li>
    <li><a href="#yeu-cau-he-thong">Yêu cầu hệ thống</a></li>
    <li><a href="#cai-dat-va-chay-ung-dung">Cài đặt và Chạy ứng dụng</a></li>
    <li><a href="#thanh-vien-nhom">Thành viên nhóm</a></li>
    <li><a href="#dong-gop">Đóng góp</a></li>
    <li><a href="#giao-vien-huong-dan">Giáo viên hướng dẫn</a></li>
  </ul>

  <h2 id="gioi-thieu">Giới thiệu</h2>
  <p>Buzz Chat là một ứng dụng chat thời gian thực, dễ sử dụng, được xây dựng với <strong>Next.js</strong> và <strong>ShadCN</strong> cho giao diện người dùng, <strong>Express</strong> cho backend, và <strong>MongoDB</strong> làm cơ sở dữ liệu.</p>

  <h2 id="tinh-nang">Tính năng</h2>
  <ul>
    <li>Đăng ký và đăng nhập người dùng</li>
    <li>Chat thời gian thực giữa người dùng</li>
    <li>Hỗ trợ nhắn tin cá nhân và nhóm</li>
    <li>Gửi và nhận ảnh, video, và các tệp đính kèm</li>
    <li>Giao diện người dùng hiện đại và trực quan với ShadCN</li>
  </ul>

  <h2 id="yeu-cau-he-thong">Yêu cầu hệ thống</h2>
  <ul>
    <li>Node.js v14 trở lên</li>
    <li>MongoDB (phiên bản cloud hoặc cài đặt local)</li>
    <li>Trình duyệt hỗ trợ JavaScript</li>
  </ul>

  <h2 id="cai-dat-va-chay-ung-dung">Cài đặt và Chạy ứng dụng</h2>
  <p><strong>Cài đặt các phụ thuộc cho frontend và backend:</strong></p>
  <pre><code>npm install</code></pre>

  <p><strong>Cấu hình môi trường cho backend:</strong></p>
  <p>Tạo file <code>.env</code> trong thư mục <code>backend</code> và thiết lập các biến môi trường cần thiết:</p>
  <pre><code>MONGO_URI=&lt;URL kết nối MongoDB&gt;
PORT=5000</code></pre>

  <p><strong>Chạy server backend:</strong></p>
  <pre><code>npm run dev</code></pre>

  <p><strong>Mở trình duyệt và truy cập</strong> <a href="http://localhost:3000">http://localhost:3000</a></p>
  <p>Backend: <a href="http://localhost:3001">http://localhost:3001</a></p>

  <h2 id="thanh-vien-nhom">Thành viên nhóm</h2>
  <ul>
    <li>Lý Khoa Đăng</li>
    <li>Nguyễn Quang Lộc</li>
    <li>Hồ Sỹ Hào</li>
  </ul>

  <h2 id="dong-gop">Đóng góp</h2>
  <p>Nếu bạn muốn đóng góp vào dự án, vui lòng tạo một Pull Request với mô tả chi tiết về thay đổi của bạn.</p>

  <h2 id="giao-vien-huong-dan">Giáo viên hướng dẫn</h2>
  <p>Dự án này được phát triển dưới sự hướng dẫn của <strong>Giáo viên Huỳnh Phước Danh</strong> cho môn <em>Ứng Dụng 02</em>.</p>
</body>
</html>
