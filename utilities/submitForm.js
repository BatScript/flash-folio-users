import { textToHtmlId } from './common'

export const saveFormData = (formData) => {
  console.log('Formadata captured is : ', formData)
  const { name, profession, listItems } = formData
  // formData looks like this :
  // {
  //     "name": "Mohit",
  //     "profession": "",
  //     "listItems": [
  //         {
  //             "title": "asdasd",
  //             "desc": "<p>kashdkahdkhkahdajkshdk</p>"
  //         },
  //         {
  //             "title": "asdasd",
  //             "desc": "<p>qoiwueoiqueoiuqwoe</p>"
  //         }
  //     ]
  // }

  const listItemCreator = (listItems) => {
    const arr = []
    listItems.forEach((ele) => {
      console.log(ele);
      arr.push({
        linkUrl: textToHtmlId(ele.title),
        linkLabel: ele.title,
        content: ele.desc
      })
    })
    return arr
  }

  const dataToSaveInDb = {
    name: name,
    jobProfile: profession,
    seo: {
      title: name,
      description: 'Havent created YET'
    },
    profileContent: listItemCreator(listItems)
  }

  console.log('dataToSave in DB is : ', dataToSaveInDb)
}
