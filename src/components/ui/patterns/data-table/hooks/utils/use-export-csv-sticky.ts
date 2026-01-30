import { download, generateCsv, mkConfig } from 'export-to-csv'
import { toast } from 'sonner'
import type { SelectionState } from '../../types'

type CsvCompatibleType = string | number | boolean
export type CsvExportableData = Record<string, CsvCompatibleType>

type UseExportCsvStickyOptions<TData> = {
  data: TData[]
  selectionState: SelectionState | null
  fileName: string
  getRowId?: (row: TData, index: number) => string | number
  customizeCsvOutput?: (data: TData) => CsvExportableData
}

/**
 * Export hook for StickyDataTable that works with SelectionState instead of TanStack Table
 */
export const useExportCsvSticky = <TData>({
  data,
  selectionState,
  fileName,
  getRowId,
  customizeCsvOutput,
}: UseExportCsvStickyOptions<TData>) => {
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    filename: fileName,
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  })

  const mapDataForCsv = (item: TData): CsvExportableData =>
    customizeCsvOutput ? customizeCsvOutput(item) : (item as unknown as CsvExportableData)

  const exportData = async (items: TData[]): Promise<void> => {
    try {
      if (items.length === 0) {
        toast.error('No data to export')
        return
      }

      const csvData = items.map(mapDataForCsv)
      const csv = generateCsv(csvConfig)(csvData)
      download(csvConfig)(csv)
      toast.success(`${items.length} row${items.length === 1 ? '' : 's'} exported successfully!`)
    } catch (error) {
      console.error('Failed to export data:', error)
      toast.error(`Failed to export data.`)
      throw new Error('Export failed')
    }
  }

  const exportAll = async () => {
    try {
      await exportData(data)
    } catch (error) {
      // Error is handled in exportData
    }
  }

  const exportSelected = async () => {
    try {
      if (!selectionState || selectionState.selectedIds.size === 0) {
        toast.error('No rows selected')
        return
      }

      const selectedItems = data.filter((row, index) => {
        const rowId = getRowId ? getRowId(row, index) : index
        return selectionState.selectedIds.has(rowId)
      })

      await exportData(selectedItems)
    } catch (error) {
      // Error is handled in exportData
    }
  }

  return { exportAll, exportSelected }
}











