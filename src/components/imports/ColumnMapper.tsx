import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, ArrowRight } from 'lucide-react'

interface ColumnMapperProps {
  headers: string[]
  mappedFields: Record<string, string>
  onColumnsMapped: (mappings: Record<string, string>) => void
}

export function ColumnMapper({
  headers,
  mappedFields,
  onColumnsMapped,
}: ColumnMapperProps) {
  const [localMappings, setLocalMappings] =
    useState<Record<string, string>>(mappedFields)
  const [error, setError] = useState<string | null>(null)

  const fieldOptions = [
    { value: 'date', label: 'Date' },
    { value: 'payee', label: 'Payee/Description' },
    { value: 'amount', label: 'Amount' },
    { value: 'category', label: 'Category' },
    { value: 'account', label: 'Account' },
    { value: 'notes', label: 'Notes' },
    { value: 'ignore', label: 'Ignore this column' },
  ]

  const handleMappingChange = (header: string, value: string) => {
    setLocalMappings({
      ...localMappings,
      [header]: value,
    })
  }

  const handleSubmit = () => {
    // Validate that required fields are mapped
    const requiredFields = ['date', 'payee', 'amount']
    const mappedRequiredFields = requiredFields.filter((field) =>
      Object.values(localMappings).includes(field),
    )

    if (mappedRequiredFields.length < requiredFields.length) {
      const missingFields = requiredFields
        .filter((field) => !mappedRequiredFields.includes(field))
        .map(
          (field) =>
            fieldOptions.find((option) => option.value === field)?.label,
        )
        .join(', ')

      setError(`Please map the following required fields: ${missingFields}`)
      return
    }

    setError(null)
    onColumnsMapped(localMappings)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Map CSV Columns</h2>
        <p className="text-muted-foreground">
          Match each column from your CSV file to the corresponding field in
          your finance tracker.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">CSV Column</TableHead>
              <TableHead className="w-[100px] text-center"></TableHead>
              <TableHead>Field in Finance Tracker</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {headers.map((header) => (
              <TableRow key={header}>
                <TableCell className="font-medium">{header}</TableCell>
                <TableCell className="text-center">
                  <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                </TableCell>
                <TableCell>
                  <Select
                    value={localMappings[header] || ''}
                    onValueChange={(value) =>
                      handleMappingChange(header, value)
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Continue to Preview</Button>
      </div>
    </div>
  )
}
