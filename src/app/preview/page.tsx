'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PDFDocument } from 'pdf-lib';

export default function Preview() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

 
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData)); 
    } else {
      router.push('/'); 
    }
  }, [router]);

  const handleEdit = () => {
    router.push('/'); 
  };

  const handleSubmit = () => {
   
    alert('Form submitted!');
  };

  
  const handleDownload = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`Name: ${formData.name}`, { x: 50, y: 350, size: 12 });
    page.drawText(`Email: ${formData.email}`, { x: 50, y: 330, size: 12 });
    page.drawText(`Phone: ${formData.phone}`, { x: 50, y: 310, size: 12 });
    page.drawText(`Address: ${formData.address}`, { x: 50, y: 290, size: 12 });

    // If image is available, embed it in the PDF
    if (formData.image) {
      const imgBytes = await fetch(formData.image).then((res) => res.arrayBuffer());
      const image = await pdfDoc.embedJpg(imgBytes);

      const { width, height } = image.scale(0.5);
      page.drawImage(image, { x: 50, y: 150, width, height });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formData.pdf';
    link.click();
    URL.revokeObjectURL(link.href); // Cleanup the URL object
  };

  if (!formData) return null; // Wait until formData is loaded

  return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-4">Preview</h1>
      <div className="space-y-4">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        {formData.image && (
          <div>
            <strong>Image:</strong>
            <img src={formData.image} alt="Uploaded" className="w-40 h-40 object-cover mt-2"/>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-x-4 mt-6">
        <Button variant="outline" onClick={handleEdit}>Edit</Button>
        <div className="flex gap-4">
          <Button onClick={handleDownload}>Submit & Download PDF</Button>
        </div>
      </div>
    </div>
  );
}
