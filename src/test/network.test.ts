import { getPersonDetails } from "../screens/PersonDetailScreen/network";
import { getPersons } from "../screens/PersonListScreen/network";

jest.mock('axios', () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },

      get: jest.fn().mockReturnValue({ data: [
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
    ] }),
    }),
  };
});

describe('getPersons', () => {
  test('test', async () => {
    const request = await getPersons(0, 10);
    expect(JSON.stringify(request.data)).toBe(JSON.stringify([
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
  ]))
  });
});