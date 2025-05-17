'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, FileSpreadsheet, Upload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { ColumnMapper } from './ColumnMapper'
import { FileUploader } from './FileUploader'
import { ImportSummary } from './ImportSummary'
import { TransactionPreview } from './TransactionPreview'
import { parseCSV } from '@/lib/CsvParser'

type ImportStep = 'upload' | 'map' | 'preview' | 'import' | 'complete'

export function TransactionImporter() {
  const [step, setStep] = useState<ImportStep>('upload')
  const [csvData, setCsvData] = useState<string[][]>([])
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({})
  const [parsedTransactions, setParsedTransactions] = useState<any[]>([])
  const [importProgress, setImportProgress] = useState(0)
  const [importedCount, setImportedCount] = useState(0)
  const [duplicateCount, setDuplicateCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileUploaded = (content: string) => {
    try {
      setError(null)
      const { headers, data } = parseCSV(content)

      if (data.length === 0) {
        setError(
          'The CSV file appears to be empty. Please check the file and try again.',
        )
        return
      }

      setCsvHeaders(headers)
      setCsvData(data)

      // Set default mappings based on common header names
      const defaultMappings: Record<string, string> = {}

      headers.forEach((header) => {
        const lowerHeader = header.toLowerCase()
        if (lowerHeader.includes('date')) defaultMappings[header] = 'date'
        else if (
          lowerHeader.includes('desc') ||
          lowerHeader.includes('payee') ||
          lowerHeader.includes('merchant')
        )
          defaultMappings[header] = 'payee'
        else if (
          lowerHeader.includes('amount') ||
          lowerHeader.includes('sum') ||
          lowerHeader.includes('total')
        )
          defaultMappings[header] = 'amount'
        else if (
          lowerHeader.includes('category') ||
          lowerHeader.includes('type')
        )
          defaultMappings[header] = 'category'
        else if (
          lowerHeader.includes('note') ||
          lowerHeader.includes('memo') ||
          lowerHeader.includes('description')
        )
          defaultMappings[header] = 'notes'
      })

      setMappedFields(defaultMappings)
      setStep('map')
    } catch (err) {
      setError(
        "Failed to parse the CSV file. Please make sure it's a valid CSV format.",
      )
      console.error(err)
    }
  }

  const handleColumnsMapped = (mappings: Record<string, string>) => {
    setMappedFields(mappings)

    // Parse transactions based on mappings
    const transactions = csvData.map((row) => {
      const transaction: Record<string, any> = {}

      Object.entries(mappings).forEach(([csvHeader, fieldName]) => {
        if (fieldName && fieldName !== 'ignore') {
          const headerIndex = csvHeaders.indexOf(csvHeader)
          if (headerIndex !== -1) {
            let value = row[headerIndex]

            // Convert values based on field type
            if (fieldName === 'date') {
              try {
                value = new Date(value).toISOString()
              } catch (e) {
                value = new Date().toISOString() // Fallback to current date if parsing fails
              }
            } else if (fieldName === 'amount') {
              // Handle different amount formats
              value = value.replace(/[^\d.-]/g, '')
              value = value
            }

            transaction[fieldName] = value
          }
        }
      })

      // Set default account if not mapped
      transaction.account = transaction.account || 'Checking Account'

      return transaction
    })

    setParsedTransactions(transactions)
    setStep('preview')
  }

  const handleConfirmImport = () => {
    setStep('import')

    // Simulate import process
    let progress = 0
    let imported = 0
    let duplicates = 0
    let errors = 0

    const interval = setInterval(() => {
      progress += 5
      setImportProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        // Set final counts - in a real app these would come from the server
        imported = Math.floor(parsedTransactions.length * 0.85)
        duplicates = Math.floor(parsedTransactions.length * 0.1)
        errors = parsedTransactions.length - imported - duplicates

        setImportedCount(imported)
        setDuplicateCount(duplicates)
        setErrorCount(errors)
        setStep('complete')
      }
    }, 100)
  }

  const resetImport = () => {
    setCsvData([])
    setCsvHeaders([])
    setMappedFields({})
    setParsedTransactions([])
    setImportProgress(0)
    setImportedCount(0)
    setDuplicateCount(0)
    setErrorCount(0)
    setError(null)
    setStep('upload')
  }

  const getStepNumber = (currentStep: ImportStep): number => {
    const steps: ImportStep[] = [
      'upload',
      'map',
      'preview',
      'import',
      'complete',
    ]
    return steps.indexOf(currentStep) + 1
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle>Import Transactions</CardTitle>
            <CardDescription>
              Import your transactions from a CSV file exported from your bank
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Tabs value={step} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upload" disabled>
                  Upload
                </TabsTrigger>
                <TabsTrigger value="map" disabled>
                  Map Columns
                </TabsTrigger>
                <TabsTrigger value="preview" disabled>
                  Preview
                </TabsTrigger>
                <TabsTrigger value="complete" disabled>
                  Complete
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Progress value={(getStepNumber(step) / 5) * 100} className="h-2" />
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'upload' && (
          <FileUploader onFileUploaded={handleFileUploaded} />
        )}

        {step === 'map' && csvHeaders.length > 0 && (
          <ColumnMapper
            headers={csvHeaders}
            mappedFields={mappedFields}
            onColumnsMapped={handleColumnsMapped}
          />
        )}

        {step === 'preview' && parsedTransactions.length > 0 && (
          <TransactionPreview
            transactions={parsedTransactions}
            onConfirm={handleConfirmImport}
            onBack={() => setStep('map')}
          />
        )}

        {step === 'import' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Upload className="h-16 w-16 text-muted-foreground mb-4 animate-pulse" />
            <h3 className="text-xl font-medium mb-2">Importing Transactions</h3>
            <p className="text-muted-foreground mb-6">
              Please wait while we import your transactions...
            </p>
            <div className="w-full max-w-md mb-2">
              <Progress value={importProgress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              {importProgress}% complete
            </p>
          </div>
        )}

        {step === 'complete' && (
          <ImportSummary
            totalCount={parsedTransactions.length}
            importedCount={importedCount}
            duplicateCount={duplicateCount}
            errorCount={errorCount}
            onReset={resetImport}
          />
        )}
      </CardContent>
      {step === 'upload' && (
        <CardFooter className="border-t px-6 py-4">
          <div className="flex flex-col space-y-4 w-full">
            <h3 className="text-sm font-medium">Supported Banks and Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Chase Bank</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Bank of America</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Wells Fargo</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Citibank</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Capital One</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Any CSV Format</span>
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
