const Notification = ({ message, error}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={error ? 'error' : 'notif' }>
        {message}
        </div>
    )
}

export default Notification;