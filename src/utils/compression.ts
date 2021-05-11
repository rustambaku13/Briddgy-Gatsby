import Compressor from "compressorjs"

export const compressAndReturn = files => {
  // Compresses the given files and returns as files array

  const formData = new FormData()

  return new Promise((resolve, reject) => {
    files.forEach((f, ind) => {
      new Compressor(f.originFileObj || f, {
        quality: 0.4,
        maxWidth:400,
        success(result) {
          //@ts-ignore
          formData.append("file", result, result.name)
          if (ind == files.length - 1) {
            resolve(formData)
          }
        },
        error(err) {
          reject("Error has occured")
        },
      })
    })
  })
}
