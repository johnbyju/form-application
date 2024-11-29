// import { connectToDatabase } from "@/app/api/dbtest/route"; 
// import UserData from "../modal/userData.model";
// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// export const addFormDetails = async ({ formData }: { formData: FormData }) => {
//   try {
//     await connectToDatabase();

//     const newUser = new UserData({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//     });


//     await newUser.save();

//     console.log('User data added successfully');
//   } catch (error) {
//     console.log('Error adding form details:', error);
//   }
// };
