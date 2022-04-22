import { useState, ChangeEvent, useCallback } from "react"

export function useForm<T>(state: T) {
  const [formData, setFormData] = useState<T>(state)

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const onCheckboxChange = (e: any) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.checked,
    }))
  }

  const resetForm = useCallback(() => {
    setFormData(state)
  }, [state])

  return {
    formData,
    onChange,
    onCheckboxChange,
    resetForm,
  }
}
