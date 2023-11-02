export const change = (e, setinput) => {
    const { name, value } = e.target;
    setinput((data) => {
        return {
            ...data,
            [name]: value
        }
    })
}
