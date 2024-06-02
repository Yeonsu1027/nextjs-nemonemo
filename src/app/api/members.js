"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// id로 회원정보 조회
export const findByUser = async (m_id) => {
  try {
    const result = await prisma.tbl_members.findUnique({
      where: { m_id: m_id },
    });
    prisma.$disconnect;
    return result;
  } catch (error) {
    console.error(error);
    prisma.$disconnect;
  }
};

export const joinUser = async (data) => {
  const { m_id, m_pw, m_nick } = data;
  try {
    const result = await prisma.tbl_members.create({
      data: {
        m_id,
        m_pw,
        m_nick,
      },
    });
    prisma.$disconnect();
    return result;
  } catch (error) {
    console.error(error);
    prisma.$disconnect();
  }
};

export const loginUser = async (m_id, m_pw) => {
  const result = await prisma.tbl_members.findUnique({
    where: { m_id: m_id, m_pw: m_pw },
  });
  prisma.$disconnect;
  return result;
};
