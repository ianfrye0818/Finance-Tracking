import { useState } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Edit, Loader2, MoreHorizontal, Plus, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  parentId?: string
  color?: string
}

export function CategorySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Food', type: 'expense', color: '#22c55e' },
    { id: '2', name: 'Groceries', type: 'expense', parentId: '1' },
    { id: '3', name: 'Dining Out', type: 'expense', parentId: '1' },
    { id: '4', name: 'Housing', type: 'expense', color: '#3b82f6' },
    { id: '5', name: 'Rent', type: 'expense', parentId: '4' },
    { id: '6', name: 'Utilities', type: 'expense', parentId: '4' },
    { id: '7', name: 'Transportation', type: 'expense', color: '#f59e0b' },
    { id: '8', name: 'Gas', type: 'expense', parentId: '7' },
    { id: '9', name: 'Public Transit', type: 'expense', parentId: '7' },
    { id: '10', name: 'Income', type: 'income', color: '#8b5cf6' },
    { id: '11', name: 'Salary', type: 'income', parentId: '10' },
    { id: '12', name: 'Bonus', type: 'income', parentId: '10' },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    type: 'expense',
  })

  const parentCategories = categories.filter((category) => !category.parentId)
  const expenseCategories = parentCategories.filter(
    (category) => category.type === 'expense',
  )
  const incomeCategories = parentCategories.filter(
    (category) => category.type === 'income',
  )

  const getSubcategories = (parentId: string) => {
    return categories.filter((category) => category.parentId === parentId)
  }

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleAddCategory = () => {
    if (!newCategory.name) return

    const id = (
      Math.max(...categories.map((c) => parseInt(c.id))) + 1
    ).toString()
    const category: Category = {
      id,
      name: newCategory.name,
      type: newCategory.type as 'income' | 'expense',
      parentId: newCategory.parentId,
      color: newCategory.color,
    }

    setCategories([...categories, category])
    setShowAddDialog(false)
    setNewCategory({ name: '', type: 'expense' })
  }

  const handleEditCategory = () => {
    if (!currentCategory || !currentCategory.name) return

    const updatedCategories = categories.map((category) =>
      category.id === currentCategory.id ? currentCategory : category,
    )

    setCategories(updatedCategories)
    setShowEditDialog(false)
    setCurrentCategory(null)
  }

  const handleDeleteCategory = () => {
    if (!currentCategory) return

    // Also delete subcategories
    const categoriesToDelete = [
      currentCategory.id,
      ...categories
        .filter((c) => c.parentId === currentCategory.id)
        .map((c) => c.id),
    ]

    const updatedCategories = categories.filter(
      (category) => !categoriesToDelete.includes(category.id),
    )

    setCategories(updatedCategories)
    setShowDeleteDialog(false)
    setCurrentCategory(null)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Manage your transaction categories and subcategories.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Expense Categories</h3>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {category.color && (
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                      )}
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      Expense
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {getSubcategories(category.id).map((subcategory) => (
                        <span
                          key={subcategory.id}
                          className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
                        >
                          {subcategory.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentCategory(category)
                            setShowEditDialog(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentCategory(category)
                            setShowDeleteDialog(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Separator />

        <h3 className="text-lg font-medium">Income Categories</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {category.color && (
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                      )}
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Income
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {getSubcategories(category.id).map((subcategory) => (
                        <span
                          key={subcategory.id}
                          className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
                        >
                          {subcategory.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentCategory(category)
                            setShowEditDialog(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentCategory(category)
                            setShowDeleteDialog(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="ghost">Reset to Defaults</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>

      {/* Add Category Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a new category or subcategory for your transactions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={newCategory.name || ''}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="e.g. Entertainment"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Category Type</Label>
              <Select
                value={newCategory.type || 'expense'}
                onValueChange={(value) =>
                  setNewCategory({
                    ...newCategory,
                    type: value as 'income' | 'expense',
                  })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent">Parent Category (Optional)</Label>
              <Select
                value={newCategory.parentId || ''}
                onValueChange={(value) =>
                  setNewCategory({
                    ...newCategory,
                    parentId: value || undefined,
                  })
                }
              >
                <SelectTrigger id="parent">
                  <SelectValue placeholder="None (Top-level category)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    None (Top-level category)
                  </SelectItem>
                  {parentCategories
                    .filter((c) => c.type === newCategory.type)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {!newCategory.parentId && (
              <div className="grid gap-2">
                <Label htmlFor="color">Category Color</Label>
                <div className="flex gap-2">
                  {[
                    '#22c55e',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#ec4899',
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`h-8 w-8 rounded-full ${
                        newCategory.color === color
                          ? 'ring-2 ring-offset-2'
                          : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCategory({ ...newCategory, color })}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      {currentCategory && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>Edit the category details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              {!currentCategory.parentId && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-color">Category Color</Label>
                  <div className="flex gap-2">
                    {[
                      '#22c55e',
                      '#3b82f6',
                      '#f59e0b',
                      '#ef4444',
                      '#8b5cf6',
                      '#ec4899',
                    ].map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`h-8 w-8 rounded-full ${
                          currentCategory.color === color
                            ? 'ring-2 ring-offset-2'
                            : ''
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          setCurrentCategory({ ...currentCategory, color })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditCategory}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Category Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the category {currentCategory?.name}
              {getSubcategories(currentCategory?.id || '').length > 0 &&
                ' and all its subcategories'}
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
