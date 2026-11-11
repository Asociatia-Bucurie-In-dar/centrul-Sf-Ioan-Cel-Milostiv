'use client';

import { useActionState } from 'react';
import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { login } from '@/app/admin/actions';

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, null);

    return (
        <form action={formAction}>
            <Stack>
                <TextInput key={state?.email} name="email" type="email" label="Email" autoComplete="username" required
                           defaultValue={state?.email} />
                <PasswordInput name="password" label="Parolă" autoComplete="current-password" required />
                {state?.error && <Alert color="red">{state.error}</Alert>}
                <Button type="submit" loading={pending}>Intră în cont</Button>
            </Stack>
        </form>
    );
}
