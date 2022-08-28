import { formatSampleText, getStartTime, getUserDetails, getUserEmail, getUserName, getUserPhone, getUserPicture } from "../utils/userUtils"

test('test to get user deatils', () => {
  expect(getUserDetails(2, personList)).toBe(personList[1])
})

test("get user name", () => {
    expect(getUserName(person)).toBe("Abass Adisa")
})

test("get user phone", () => {
    expect(getUserPhone(person)).toBe("08094157565")
})

test("get user email", () => {
    expect(getUserEmail(person)).toBe("abass@gmail.com")
})

test("get user picture", () => {
    expect(getUserPicture(person)).toBe("abass512.jpg")
})

test("get user start time and date", () => {
    expect(JSON.stringify(getStartTime(start_time))).toBe(JSON.stringify({add_date: "22-08-2022", add_time: "05:35:00"}))
})

test("format text by removing [Sample]", () => {
    expect(formatSampleText("[Sample] Adisa Abass")).toBe("Adisa Abass")
    expect(formatSampleText("Adisa Richard")).toBe("Adisa Richard")
})

const start_time = "22-08-2022 05:35:00"

export const personList = [
    {
        id: 1,
        first_name: "Abass",
        last_name: "Adisa",
        phone: [{
            label: "",
            value: "08094157565",
            primary: true
        }],
        email: [{
            label: "",
            value: "abass@gmail.com",
            primary: true
        }],
        picture_id: {
            pictures: {
                128: "abass128.jpg",
                512: "abass512.jpg"
            }
        }
    },
    {
        id: 2,
        first_name: "Scarlett",
        last_name: "Johansson",
        phone: [{
            label: "",
            value: "08094167565",
            primary: true
        }],
        email: [{
            label: "",
            value: "scarlett@gmail.com",
            primary: true
        }],
        picture_id: {
            pictures: {
                128: "scarlett128.jpg",
                512: "scarlett512.jpg"
            }
        }
    }
]

const person = {
    id: 1,
    first_name: "Abass",
    last_name: "Adisa",
    phone: [{
        label: "",
        value: "08094157565",
        primary: true
    }],
    email: [{
        label: "",
        value: "abass@gmail.com",
        primary: true
    }],
    picture_id: {
        pictures: {
            128: "abass128.jpg",
            512: "abass512.jpg"
        }
    }
}
