import bcrypt from 'bcrypt'


export const hashData = async (password) => {
    const salt = await bcrypt.genSalt();
    const result = await bcrypt.hash(password, salt)
    return result
}

export const compareData = async (dataInput, datahash) => {
    const result = await bcrypt.compare(dataInput, datahash)
    return result
}