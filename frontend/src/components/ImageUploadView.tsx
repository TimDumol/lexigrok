import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadViewProps {
  onImageSelected: (imageDataUrl: string) => void;
  onCancel: () => void;
}

const ImageUploadView: React.FC<ImageUploadViewProps> = ({ onImageSelected, onCancel }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File is too large. Please select an image under 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Invalid file type. Please select an image.');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartPractice = () => {
    if (imagePreview) {
      onImageSelected(imagePreview);
    } else {
      setError('Please select an image first.');
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Practice with an Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!imagePreview ? (
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={handleUploadClick}
              onDrop={(e) => {
                e.preventDefault();
                handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Click or drag & drop to upload</p>
              <p className="text-xs text-muted-foreground/80">PNG, JPG, GIF up to 5MB</p>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative">
              <img src={imagePreview} alt="Selected preview" className="rounded-lg w-full h-auto object-contain" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={onCancel} variant="outline" className="w-full">Cancel</Button>
            <Button onClick={handleStartPractice} disabled={!imagePreview} className="w-full">
              Start Practice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUploadView;
