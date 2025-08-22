import nodemailer from 'nodemailer';
import { IAppointment } from '../models/Appointment';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send appointment confirmation email
export const sendAppointmentEmail = async (appointment: IAppointment): Promise<void> => {
  const transporter = createTransporter();
  
  const branchName = appointment.branch === 'incheon' ? '더비다 인천점' : '더비다 안양점';
  const branchPhone = appointment.branch === 'incheon' ? '032-891-0121' : '031-464-5075';
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || '더비다 요양원 <noreply@thevida.com>',
    to: process.env.ADMIN_EMAIL || 'admin@thevida.com',
    subject: `[더비다] 새로운 방문상담 예약 - ${appointment.elderName}님`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          🏥 더비다 요양원 - 새로운 방문상담 예약
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #e74c3c; margin-top: 0;">📋 예약 정보</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">지점:</td>
              <td style="padding: 8px 0;">${branchName} (${branchPhone})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">방문일시:</td>
              <td style="padding: 8px 0;">${appointment.date} ${appointment.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">어르신 성함:</td>
              <td style="padding: 8px 0;">${appointment.elderName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">보호자 성함:</td>
              <td style="padding: 8px 0;">${appointment.guardianName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">연락처:</td>
              <td style="padding: 8px 0;">${appointment.guardianPhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">관계:</td>
              <td style="padding: 8px 0;">${appointment.relationship}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">문의 유형:</td>
              <td style="padding: 8px 0;">${appointment.inquiryType}</td>
            </tr>
            ${appointment.message ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">문의 내용:</td>
              <td style="padding: 8px 0;">${appointment.message}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #27ae60;">
            <strong>⚠️ 중요:</strong> 이 예약에 대해 빠른 시일 내에 연락하여 확인해주세요.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; font-size: 14px;">
            이 이메일은 더비다 요양원 홈페이지를 통해 자동으로 발송되었습니다.
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send confirmation email to customer
export const sendCustomerConfirmationEmail = async (appointment: IAppointment): Promise<void> => {
  const transporter = createTransporter();
  
  const branchName = appointment.branch === 'incheon' ? '더비다 인천점' : '더비다 안양점';
  const branchPhone = appointment.branch === 'incheon' ? '032-891-0121' : '031-464-5075';
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || '더비다 요양원 <noreply@thevida.com>',
    to: appointment.guardianPhone + '@example.com', // 실제 구현시 보호자 이메일 필요
    subject: '[더비다] 방문상담 예약 접수 완료',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          🏥 더비다 요양원 - 방문상담 예약 접수 완료
        </h2>
        
        <p>안녕하세요, ${appointment.guardianName}님</p>
        
        <p>더비다 요양원 방문상담 예약이 성공적으로 접수되었습니다.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3498db; margin-top: 0;">📅 예약 정보</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">지점:</td>
              <td style="padding: 8px 0;">${branchName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">방문일시:</td>
              <td style="padding: 8px 0;">${appointment.date} ${appointment.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">어르신 성함:</td>
              <td style="padding: 8px 0;">${appointment.elderName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">문의 유형:</td>
              <td style="padding: 8px 0;">${appointment.inquiryType}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;">
            <strong>📞 연락처:</strong> ${branchPhone}<br>
            <strong>⏰ 영업시간:</strong> 평일 10:00-17:00, 토요일 10:00-14:00 (일요일 휴무)
          </p>
        </div>
        
        <p>빠른 시일 내에 담당자가 연락드려 예약을 확인해드리겠습니다.</p>
        
        <p>감사합니다.<br>더비다 요양원 드림</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
