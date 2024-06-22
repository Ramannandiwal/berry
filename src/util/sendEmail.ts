//
// import VerificationEmail from "../../emails/VerificationEmail";
// import {Resend} from "resend";
//  interface ApiResponse {
//     success: boolean;
//     message: string;
// }
//
// export async function sendVerificationEmail(
//     email: string,
//     username: string,
//     verifyCode: string
// ): Promise<ApiResponse> {
//     const resend = new  Resend(process.env.APIKEY)
//     try {
//         await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: email,
//             subject: 'Mystery Message Verification Code',
//             react: VerificationEmail({ username, otp: verifyCode }),
//         });
//         return { success: true, message: 'Verification email sent successfully.' };
//     } catch (emailError) {
//         console.error('Error sending verification email:', emailError);
//         return { success: false, message: 'Failed to send verification email.' };
//     }
// }