'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  // Initialize formData state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: null as string | null, // Allow image to be either a string or null
  });

  // Load existing data from localStorage if available
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string, // Store base64 image data
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission and store data in local storage
  const handlePreview = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.image) {
      alert('All fields, including the image, are required.');
      return;
    }

    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Navigate to the preview page
    router.push('/preview');
  };

  return (
    <div className="py-5 flex justify-center items-center">
      <form className="space-y-10" onSubmit={handlePreview}>
        <h1 className="text-xl font-bold mb-4">Personal Information</h1>
        <Input
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          value={formData.name}
          className='py-5 text-center sm:text-center'
        />
        <Input
          name="email"
          placeholder="Email"
          required
          type="email"
          onChange={handleChange}
          value={formData.email}
          className='py-5 text-center sm:text-center'
        />
        <Input
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
          value={formData.phone}
          className='py-5 text-center sm:text-center'
        />
        <Input
          name="address"
          placeholder="Address"
          required
          onChange={handleChange}
          value={formData.address}
          className='py-5 text-center sm:text-center'
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-50 border border-gray-300 rounded-md"
          required
        />
        <div className='flex justify-center'>
        <Button type="submit" className='py-5 text-center sm:text-center mx-auto'>
          Preview
        </Button>
        </div>
      </form>
    </div>
  );
}
