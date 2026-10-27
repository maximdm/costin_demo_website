import { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CheckCircle2, Mail, Paperclip, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const CONFIGURED = Boolean(ACCESS_KEY)
const MAX_FILE_BYTES = 10 * 1024 * 1024
const ENDPOINT = 'https://api.web3forms.com/submit'

const industryKeys = [
  'automotive',
  'energy',
  'pharma',
  'food',
  'machinery',
  'oilgas',
  'logistics',
  'water',
] as const

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function CustomRequestForm() {
  const { t } = useTranslation()
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const schema = z.object({
    name: z.string().min(1, t('contact.form.validation.nameRequired')),
    company: z.string().min(1, t('contact.form.validation.companyRequired')),
    email: z
      .string()
      .min(1, t('contact.form.validation.emailRequired'))
      .pipe(z.email(t('contact.form.validation.emailInvalid'))),
    phone: z.string().optional(),
    industry: z.string().optional(),
    message: z
      .string()
      .min(1, t('contact.form.validation.messageRequired'))
      .min(10, t('contact.form.validation.messageMin')),
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: '',
      message: '',
    },
  })

  const onFilesSelected = (list: FileList | null) => {
    if (!list) return
    const incoming = Array.from(list)
    const tooBig = incoming.filter((f) => f.size > MAX_FILE_BYTES)
    const ok = incoming.filter((f) => f.size <= MAX_FILE_BYTES)
    if (ok.length) setFiles((prev) => [...prev, ...ok])
    setFileError(tooBig.length > 0 ? t('contact.form.validation.fileSize') : null)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!ACCESS_KEY) return
    setStatus('submitting')
    try {
      const fd = new FormData()
      fd.append('access_key', ACCESS_KEY)
      fd.append('from_name', values.company || values.name)
      fd.append('subject', `RFQ — ${values.company || values.name}`)
      fd.append('replyto', values.email)
      fd.append('name', values.name)
      fd.append('company', values.company)
      fd.append('email', values.email)
      fd.append('phone', values.phone ?? '')
      fd.append('industry', values.industry ?? '')
      fd.append('message', values.message)
      for (const file of files) fd.append('attachment', file)

      const res = await fetch(ENDPOINT, { method: 'POST', body: fd })
      const data = (await res.json()) as { success?: boolean }
      if (data.success) {
        setStatus('success')
        reset()
        setFiles([])
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-panel relative flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="text-xl font-semibold font-display">
          {t('contact.form.success.title')}
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          {t('contact.form.success.description')}
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          {t('common.cta.requestQuote')}
        </Button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="glass-panel relative flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
        <Mail className="size-12 text-destructive" />
        <h3 className="text-xl font-semibold font-display">
          {t('contact.form.error.title')}
        </h3>
        <p className="max-w-sm text-muted-foreground">
          {t('contact.form.error.description')}
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          {t('common.cta.requestQuote')}
        </Button>
      </div>
    )
  }

  return (
    <div className="glass-panel relative rounded-3xl p-6 sm:p-8">
      <h3 className="text-xl font-semibold font-display">
        {t('contact.form.title')}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {t('contact.form.description')}
      </p>

      {!CONFIGURED && (
        <div className="mt-4 rounded-xl border border-border/60 bg-muted/40 p-4 text-sm">
          <p className="font-medium">{t('contact.form.unavailable.title')}</p>
          <p className="mt-1 text-muted-foreground">
            {t('contact.form.unavailable.description')}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t('contact.form.fields.name.label')}</Label>
            <Input
              id="name"
              placeholder={t('contact.form.fields.name.placeholder')}
              aria-invalid={errors.name ? 'true' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t('contact.form.fields.company.label')}</Label>
            <Input
              id="company"
              placeholder={t('contact.form.fields.company.placeholder')}
              aria-invalid={errors.company ? 'true' : undefined}
              {...register('company')}
            />
            {errors.company && (
              <p className="text-xs text-destructive">{errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('contact.form.fields.email.label')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('contact.form.fields.email.placeholder')}
              aria-invalid={errors.email ? 'true' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('contact.form.fields.phone.label')}</Label>
            <Input
              id="phone"
              placeholder={t('contact.form.fields.phone.placeholder')}
              {...register('phone')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">{t('contact.form.fields.industry.label')}</Label>
          <Controller
            control={control}
            name="industry"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="industry">
                  <SelectValue
                    placeholder={t('contact.form.fields.industry.placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {industryKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`industries.items.${key}.name`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t('contact.form.fields.message.label')}</Label>
          <Textarea
            id="message"
            rows={5}
            placeholder={t('contact.form.fields.message.placeholder')}
            aria-invalid={errors.message ? 'true' : undefined}
            {...register('message')}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t('contact.form.fields.files.label')}</Label>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-dashed py-6"
          >
            <Paperclip className="size-4" />
            {t('contact.form.fields.files.button')}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.dwg,.xlsx,.zip,image/*"
            className="hidden"
            onChange={(e) => onFilesSelected(e.target.files)}
          />
          <p className="text-xs text-muted-foreground/70">
            {t('contact.form.fields.files.help')}
          </p>
          {fileError && (
            <p className="text-xs text-destructive">{fileError}</p>
          )}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium">
                {t('contact.form.fields.files.selected', { count: files.length })}
              </p>
              <ul className="space-y-1.5">
                {files.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-sm"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      aria-label={file.name}
                      className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-stretch gap-4 pt-1">
          <Button
            type="submit"
            size="lg"
            className="w-full bg-brand-gradient text-white shadow-[0_10px_30px_-12px_rgba(107,31,161,0.7)] hover:opacity-90"
            disabled={status === 'submitting' || !CONFIGURED}
          >
            {status === 'submitting'
              ? t('contact.form.submitting')
              : t('contact.form.submit')}
            {status !== 'submitting' && <ArrowRight />}
          </Button>
          <p className="text-xs text-muted-foreground/70">
            {t('contact.form.privacy')}
          </p>
        </div>
      </form>
    </div>
  )
}
