import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Upload } from 'lucide-react'

interface FileUploaderProps {
  onFileUploaded: (content: string) => void
}

export function FileUploader({ onFileUploaded }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length) {
      processFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please upload a CSV file')
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        onFileUploaded(content)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-full max-w-3xl border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Upload CSV File</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Drag and drop your CSV file here, or click to browse your files
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
          >
            Select File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {fileName && (
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span>{fileName}</span>
        </div>
      )}

      <div className="mt-8 w-full max-w-3xl">
        <h3 className="text-lg font-medium mb-4">
          How to export transactions from your bank
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Chase Bank</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Log in to your Chase account</li>
              <li>
                Navigate to the account you want to export transactions from
              </li>
              <li>Click on "See activity"</li>
              <li>Select the date range you want to export</li>
              <li>Click on "Download" and select "CSV"</li>
            </ol>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Bank of America</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Log in to your Bank of America account</li>
              <li>Go to the "Accounts" tab</li>
              <li>Select the account you want to export transactions from</li>
              <li>Click on "Download" and select your date range</li>
              <li>Choose "Microsoft Excel (.csv)" as the format</li>
            </ol>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-2">Other Banks</h4>
            <p className="text-sm text-muted-foreground">
              Most banks offer CSV export options in their transaction history
              or account activity sections. Look for "Download," "Export," or
              "Save" options, and select CSV as the format.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
