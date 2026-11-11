'use client';

import { FormEvent, ReactNode, useState } from 'react';
import {
    Alert,
    Anchor,
    Button,
    Checkbox,
    Chip,
    Group,
    NumberInput,
    Paper,
    Radio,
    Select,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    TextInput,
    ThemeIcon,
    Title,
} from '@mantine/core';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { MyRoutePaths } from '@/utils/route-paths';
import {
    VOLUNTEER_AGE_RANGES,
    VOLUNTEER_AREAS,
    VOLUNTEER_AVAILABILITY_TYPES,
    VOLUNTEER_COMMITMENTS,
    VOLUNTEER_HOURS_MAX,
    VOLUNTEER_HOURS_MIN,
    VOLUNTEER_SKILLS,
    VOLUNTEER_SOURCES,
    VOLUNTEER_TIME_SLOTS,
    VOLUNTEER_WORK_MODES,
} from '@/content/volunteer/volunteer-options';
import {
    EMPTY_VOLUNTEER_FORM,
    validateVolunteer,
    VolunteerErrors,
    VolunteerFormValues,
} from '@/utils/volunteers/validation';
import classes from './VolunteerForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <Paper withBorder radius="md" p={{ base: 'md', sm: 'xl' }} className={classes.section}>
            <Title order={3} mb="lg" className={classes.sectionTitle}>
                {title}
            </Title>
            <Stack gap="lg">{children}</Stack>
        </Paper>
    );
}

export function VolunteerForm() {
    const t = useTranslations('VOLUNTEER');
    const locale = useLocale();
    const [values, setValues] = useState<VolunteerFormValues>(EMPTY_VOLUNTEER_FORM);
    const [errors, setErrors] = useState<VolunteerErrors>({});
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState<Status>('idle');

    function set<K extends keyof VolunteerFormValues>(field: K, value: VolunteerFormValues[K]) {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    }

    const err = (field: keyof VolunteerFormValues) => (errors[field] ? t(`ERRORS.${errors[field]}`) : undefined);
    const options = (group: string, keys: readonly string[]) =>
        keys.map((key) => ({ value: key, label: t(`OPTIONS.${group}.${key}`) }));
    const textInput = (field: keyof VolunteerFormValues) => ({
        value: values[field] as string,
        onChange: (e: { currentTarget: { value: string } }) => set(field, e.currentTarget.value as never),
        error: err(field),
    });

    function scrollToFirstError() {
        requestAnimationFrame(() => {
            document.querySelector('.mantine-InputWrapper-error, [data-volunteer-error]')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        const result = validateVolunteer(values);
        if (!result.ok) {
            setErrors(result.errors);
            scrollToFirstError();
            return;
        }

        setStatus('sending');
        try {
            const res = await fetch('/api/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, locale, website: honeypot }),
            });
            if (res.ok) {
                setStatus('success');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const data = await res.json().catch(() => null);
            if (data?.errors) {
                setErrors(data.errors);
                setStatus('idle');
                scrollToFirstError();
                return;
            }
            setStatus('error');
        } catch {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <Paper withBorder radius="md" p="xl" ta="center" className={classes.section}>
                <ThemeIcon size={64} radius="xl" color="green" variant="light" mx="auto">
                    <IconCircleCheck size={36} stroke={1.5} />
                </ThemeIcon>
                <Title order={2} mt="md">
                    {t('SUCCESS_TITLE')}
                </Title>
                <Text mt="sm" c="customDimmed" fw={500}>
                    {t('SUCCESS_TEXT')}
                </Text>
                <Button component={Link} href={MyRoutePaths.Home} variant="light" mt="xl">
                    {t('BACK_HOME')}
                </Button>
            </Paper>
        );
    }

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form onSubmit={onSubmit} noValidate>
            <Stack gap="xl">
                <Section title={t('SECTIONS.ABOUT_YOU')}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <TextInput label={t('FIELDS.FIRST_NAME')} required autoComplete="given-name" maxLength={80}
                                   {...textInput('firstName')} />
                        <TextInput label={t('FIELDS.LAST_NAME')} required autoComplete="family-name" maxLength={80}
                                   {...textInput('lastName')} />
                        <TextInput label={t('FIELDS.EMAIL')} required type="email" autoComplete="email" maxLength={254}
                                   {...textInput('email')} />
                        <TextInput label={t('FIELDS.PHONE')} required type="tel" autoComplete="tel" maxLength={30}
                                   {...textInput('phone')} />
                        <TextInput label={t('FIELDS.CITY')} autoComplete="address-level2" maxLength={80}
                                   {...textInput('city')} />
                        <Select label={t('FIELDS.AGE_RANGE')} required placeholder={t('FIELDS.SELECT_PLACEHOLDER')}
                                data={options('AGE_RANGES', VOLUNTEER_AGE_RANGES)} value={values.ageRange || null}
                                onChange={(v) => set('ageRange', v ?? '')} error={err('ageRange')}
                                allowDeselect={false} comboboxProps={{ zIndex: 100030 }} />
                    </SimpleGrid>
                    <TextInput label={t('FIELDS.OCCUPATION')} autoComplete="organization-title" maxLength={300}
                               {...textInput('occupation')} />
                </Section>

                <Section title={t('SECTIONS.INVOLVEMENT')}>
                    <Checkbox.Group label={t('FIELDS.AREAS')} description={t('FIELDS.AREAS_HINT')} required
                                    value={values.areas} onChange={(v) => set('areas', v)} error={err('areas')}>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xs" spacing="sm">
                            {VOLUNTEER_AREAS.map((key) => (
                                <Checkbox.Card key={key} value={key} radius="md" p="sm" className={classes.card}>
                                    <Group wrap="nowrap" align="flex-start" gap="sm">
                                        <Checkbox.Indicator mt={2} />
                                        <div>
                                            <Text fw={600} fz="sm">{t(`OPTIONS.AREAS.${key}`)}</Text>
                                            <Text fz="xs" c="dimmed">{t(`OPTIONS.AREA_DESCRIPTIONS.${key}`)}</Text>
                                        </div>
                                    </Group>
                                </Checkbox.Card>
                            ))}
                        </SimpleGrid>
                    </Checkbox.Group>

                    <div>
                        <Text fz="sm" fw={500}>{t('FIELDS.SKILLS')}</Text>
                        <Text fz="xs" c="dimmed" mb="xs">{t('FIELDS.SKILLS_HINT')}</Text>
                        <Chip.Group multiple value={values.skills} onChange={(v) => set('skills', v)}>
                            <Group gap="xs">
                                {VOLUNTEER_SKILLS.map((key) => (
                                    <Chip key={key} value={key} size="sm" variant="outline">
                                        {t(`OPTIONS.SKILLS.${key}`)}
                                    </Chip>
                                ))}
                            </Group>
                        </Chip.Group>
                    </div>
                    <TextInput label={t('FIELDS.OTHER_SKILLS')} placeholder={t('FIELDS.OTHER_SKILLS_PLACEHOLDER')}
                               maxLength={300} {...textInput('otherSkills')} />
                </Section>

                <Section title={t('SECTIONS.AVAILABILITY')}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <NumberInput label={t('FIELDS.HOURS_PER_WEEK')} description={t('FIELDS.HOURS_PER_WEEK_HINT')}
                                     required min={VOLUNTEER_HOURS_MIN} max={VOLUNTEER_HOURS_MAX}
                                     allowDecimal={false} allowNegative={false} clampBehavior="strict"
                                     value={values.hoursPerWeek} onChange={(v) => set('hoursPerWeek', v)}
                                     error={err('hoursPerWeek')} />
                        <Select label={t('FIELDS.COMMITMENT')} required placeholder={t('FIELDS.SELECT_PLACEHOLDER')}
                                data={options('COMMITMENTS', VOLUNTEER_COMMITMENTS)} value={values.commitment || null}
                                onChange={(v) => set('commitment', v ?? '')} error={err('commitment')}
                                allowDeselect={false} comboboxProps={{ zIndex: 100030 }} />
                    </SimpleGrid>

                    <Radio.Group label={t('FIELDS.AVAILABILITY_TYPE')} required value={values.availabilityType}
                                 onChange={(v) => set('availabilityType', v)} error={err('availabilityType')}>
                        <Stack gap="xs" mt="xs">
                            {VOLUNTEER_AVAILABILITY_TYPES.map((key) => (
                                <Radio key={key} value={key} label={t(`OPTIONS.AVAILABILITY_TYPES.${key}`)} />
                            ))}
                        </Stack>
                    </Radio.Group>

                    <Checkbox.Group label={t('FIELDS.TIME_SLOTS')} value={values.timeSlots}
                                    onChange={(v) => set('timeSlots', v)}>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xs" spacing="xs">
                            {VOLUNTEER_TIME_SLOTS.map((key) => (
                                <Checkbox key={key} value={key} label={t(`OPTIONS.TIME_SLOTS.${key}`)} />
                            ))}
                        </SimpleGrid>
                    </Checkbox.Group>

                    <Radio.Group label={t('FIELDS.WORK_MODE')} required value={values.workMode}
                                 onChange={(v) => set('workMode', v)} error={err('workMode')}>
                        <Group gap="lg" mt="xs">
                            {VOLUNTEER_WORK_MODES.map((key) => (
                                <Radio key={key} value={key} label={t(`OPTIONS.WORK_MODES.${key}`)} />
                            ))}
                        </Group>
                    </Radio.Group>
                </Section>

                <Section title={t('SECTIONS.MORE')}>
                    <Textarea label={t('FIELDS.EXPERIENCE')} placeholder={t('FIELDS.EXPERIENCE_PLACEHOLDER')}
                              autosize minRows={3} maxRows={8} maxLength={2000} {...textInput('experience')} />
                    <Textarea label={t('FIELDS.MOTIVATION')} autosize minRows={3} maxRows={8} maxLength={2000}
                              {...textInput('motivation')} />
                    <Select label={t('FIELDS.SOURCE')} placeholder={t('FIELDS.SELECT_PLACEHOLDER')}
                            data={options('SOURCES', VOLUNTEER_SOURCES)} value={values.source || null}
                            onChange={(v) => set('source', v ?? '')} clearable comboboxProps={{ zIndex: 100030 }} />
                </Section>

                {/* Honeypot for bots - hidden from people and screen readers. */}
                <div className={classes.honeypot} aria-hidden="true">
                    <label htmlFor="volunteer-website">Website</label>
                    <input id="volunteer-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                           value={honeypot} onChange={(e) => setHoneypot(e.currentTarget.value)} />
                </div>

                <Paper withBorder radius="md" p={{ base: 'md', sm: 'xl' }} className={classes.section}>
                    <Checkbox
                        checked={values.consent}
                        onChange={(e) => set('consent', e.currentTarget.checked)}
                        error={err('consent')}
                        data-volunteer-error={errors.consent ? true : undefined}
                        label={t.rich('CONSENT', {
                            link: (chunks) => (
                                <Anchor component={Link} href={MyRoutePaths.Privacy} target="_blank" inherit>
                                    {chunks}
                                </Anchor>
                            ),
                        })}
                    />
                    <Text fz="xs" c="dimmed" mt="md">{t('REQUIRED_NOTE')}</Text>

                    {hasErrors && (
                        <Alert color="red" icon={<IconAlertCircle />} mt="md">{t('ERRORS.FORM_HAS_ERRORS')}</Alert>
                    )}
                    {status === 'error' && (
                        <Alert color="red" icon={<IconAlertCircle />} mt="md">{t('ERRORS.SUBMIT_FAILED')}</Alert>
                    )}

                    <Button type="submit" size="md" mt="lg" fullWidth loading={status === 'sending'} fw={700}>
                        {t('SUBMIT')}
                    </Button>
                </Paper>
            </Stack>
        </form>
    );
}
