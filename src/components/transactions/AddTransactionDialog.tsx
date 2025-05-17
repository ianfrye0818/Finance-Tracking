import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface AddTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accounts: string[]
  onAddTransaction: (transaction: {
    date: Date
    payee: string
    amount: number
    account: string
    category: string
    subcategory: string
    tags: string[]
    notes: string
  }) => void
}

export function AddTransactionDialog({
  open,
  onOpenChange,
  accounts,
  onAddTransaction,
}: AddTransactionDialogProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [payee, setPayee] = useState('')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState(accounts[0] || '')
  const [category, setCategory] = useState('Food')
  const [subcategory, setSubcategory] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const categories = [
    'Food',
    'Housing',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Personal',
    'Education',
    'Shopping',
    'Income',
    'Transfer',
    'Other',
  ]

  const subcategories: Record<string, string[]> = {
    Food: ['Groceries', 'Dining Out', 'Coffee', 'Snacks'],
    Housing: ['Rent', 'Mortgage', 'Insurance', 'Repairs', 'Furniture'],
    Transportation: ['Gas', 'Public Transit', 'Car Maintenance', 'Parking'],
    Entertainment: ['Movies', 'Games', 'Concerts', 'Subscriptions'],
    Utilities: ['Electricity', 'Water', 'Internet', 'Phone'],
    Healthcare: ['Doctor', 'Medication', 'Insurance'],
    Personal: ['Clothing', 'Haircut', 'Gym'],
    Education: ['Tuition', 'Books', 'Courses'],
    Shopping: ['Electronics', 'Gifts', 'Household'],
    Income: ['Salary', 'Bonus', 'Interest', 'Dividends'],
    Transfer: ['Account Transfer', 'Savings'],
    Other: ['Miscellaneous'],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTransaction({
      date,
      payee,
      amount: Number.parseFloat(amount) || 0,
      account,
      category,
      subcategory,
      tags,
      notes,
    })
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setDate(new Date())
    setPayee('')
    setAmount('')
    setAccount(accounts[0] || '')
    setCategory('Food')
    setSubcategory('')
    setTagInput('')
    setTags([])
    setNotes('')
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your financial transaction.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payee">Payee</Label>
              <Input
                id="payee"
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
                placeholder="e.g. Grocery Store"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account">Account</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc} value={acc}>
                      {acc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value)
                    setSubcategory('')
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select value={subcategory} onValueChange={setSubcategory}>
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories[category]?.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button type="button" onClick={addTag} size="sm">
                  Add
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes here..."
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit">Add Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
