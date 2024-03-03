import pb from './pb'

export const STUDENTS_URL =
  'https://opensheet.elk.sh/1ngRi2HTDztn_EKxL912kH0s3p7-Y04x35GEposNee2A/sheet1'

interface StudentData {
  'Faculty No.': string
  'En.No.': string
  Name: string
  Mode: string
  Class: string
  'S.No': string
  'Mobile No': string
  'email id': string
}

const formatmap: Record<string, string> = {
  'Faculty No.': 'faculty',
  'En.No.': 'enroll',
  Name: 'name',
  Mode: 'a',
  Class: 'section',
  'S.No': 'serial',
  'Mobile No': 'phone',
  'email id': 'email',
}

const usernamer = (name: string) =>
  name
    .split(' ')
    .map((i) => i.toLowerCase())
    .join('-')

export const formatobj = async (studentData: Record<string, string>) => {
  const newObj: Record<string, string> = {}
  for (const field in studentData) newObj[formatmap[field]] = studentData[field]

  return newObj
}
const addSection = (dataArr: Array<Record<string, string>>) =>
  dataArr.map(async (data) => {
    const sectionId = (await pb.collection('sections').getOne(data['section']))
      .id
    data['section'] = sectionId
  })

export const getData = () =>
  fetch(STUDENTS_URL)
    .then((r) => r.json())
    .then((objArr) => Promise.all(objArr.map(formatobj)))

export const getSectionId = async (sectionName: string) =>
  (await pb.collection('sections').getFirstListItem(`name="${sectionName}"`)).id

export const syncClasses = async () => {
  const data = await getData()
  console.log('Data length', data.length)
  const sections = new Set(data.map((i) => i.section))

  console.log(sections)

  for (const section of sections) {
    const uploaded = await pb
      .collection('sections')
      .create({ name: section })
      .then(console.log)
      .catch(console.error)
  }
}

export const syncStudents = async () => {
  const data = await getData()

  const filtered = await Promise.all(
    data.map(async (obj) => {
      obj.serial = +obj.serial
      obj.phone = obj.phone.length === 10 ? +obj.phone : +obj.phone.slice(3)
      obj.username = usernamer(obj.name)
      obj.password = 'adminadmin'
      obj.passwordConfirm = 'adminadmin'
      obj.section = await getSectionId(obj.section).catch(console.error)
      delete obj.a
      // delete obj.section
      return obj
    })
  )
  console.log(filtered)
  for (const student of filtered)
    await pb
      .collection('students')
      .create(student)
      .then(console.log)
      .catch(console.error)
}

export const updateSection = async () => {
  const ids = {
    A1A: '3jloygdld7cpbuk',
    A1B: 'e2zabnb9l4bn2z7',
    A1C: '0uoma774sbux7vw',
    A1D: 'm3sbkgwnpoln2om',
    A1E: 'm5ig9cqqh48xslp',
    A1F: 'g8zibv5fnz924cj',
  }

  const data = await getData().then(
    async (data: { section: keyof typeof ids; enroll: String }[]) =>
      await Promise.all(
        data.map(async (data) => ({
          enroll: data.enroll,
          section: data.section,
          sectionsIds: ids[data.section],
        }))
      )
  )
  console.log(data)
  await pb
    .collection('students')
    .getFullList()
    .then((list) =>
      list.map(async (student) => {
        await pb
          .collection('students')
          .update(student.id, {
            section: data.find((d) => d.enroll === student.enroll)?.sectionsIds,
          })
          .then(console.log)
          .catch(console.error)
        return
      })
    )
}
