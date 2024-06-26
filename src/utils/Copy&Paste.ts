import { toast } from '@/components/ui/use-toast'

export const handleCopyClick = (
  value: string,
  textSuccess: string,
  textError: string
) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast({
        variant: 'success',
        title: textSuccess,
        description: ''
      })
    })
    .catch((e: ErrorResponse) => {
      toast({
        variant: 'destructive',
        title: textError,
        description: e.response?.data?.error
      })
    })
}
