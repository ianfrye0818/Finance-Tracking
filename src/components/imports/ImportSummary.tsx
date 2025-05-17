import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

interface ImportSummaryProps {
  totalCount: number
  importedCount: number
  duplicateCount: number
  errorCount: number
  onReset: () => void
}

export function ImportSummary({
  totalCount,
  importedCount,
  duplicateCount,
  errorCount,
  onReset,
}: ImportSummaryProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
      </div>

      <h3 className="mt-4 text-2xl font-medium">Import Complete</h3>

      <p className="mt-2 text-center text-muted-foreground max-w-md">
        Your transactions have been imported successfully. Here's a summary of
        the import:
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-2xl">
        <div className="flex flex-col items-center rounded-lg border p-4">
          <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
          <span className="text-2xl font-bold">{importedCount}</span>
          <span className="text-sm text-muted-foreground">
            Transactions Imported
          </span>
        </div>

        <div className="flex flex-col items-center rounded-lg border p-4">
          <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
          <span className="text-2xl font-bold">{duplicateCount}</span>
          <span className="text-sm text-muted-foreground">
            Duplicates Skipped
          </span>
        </div>

        <div className="flex flex-col items-center rounded-lg border p-4">
          <XCircle className="h-8 w-8 text-red-500 mb-2" />
          <span className="text-2xl font-bold">{errorCount}</span>
          <span className="text-sm text-muted-foreground">
            Failed to Import
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button asChild>
          <Link to="/transactions">View Transactions</Link>
        </Button>
        <Button variant="outline" onClick={onReset}>
          Import More Transactions
        </Button>
      </div>
    </div>
  )
}
