"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId  } = auth()

    if (!userId || !orgId) {
        return {
            error: "You must be logged in to create a board"
        }
    }

    const { title, image } = data

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML
    ] = image.split("|")

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing image data"
        }
    }

    let board

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML
            }
        })
    } catch(error) {
        return {
            error: "Failed to create board"
        }
    }

    revalidatePath(`/board/${board.id}`)
    return {
        data: board
    }
}


export const createBoard = createSafeAction(CreateBoard, handler)