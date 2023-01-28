// notification example - using the notify function
export const notify = (title: string, body: string | undefined) => {
    new Notification(title, { body: body || '' })
}
