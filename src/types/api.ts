export type Author = {
  age: number
  firstName: string
  lastName: string
}

export type Movie = {
  author: Author
  description: string
  genre: string
  id: number
  picture: string
  releaseDate: string
  summary: string
  title: string
}

export type Comment = {
  rating: number
  text: string
  username: string
}
