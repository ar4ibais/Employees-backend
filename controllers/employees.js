const { prisma } = require("../prisma/prisma-client");

const getAll = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

const Add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({
        message: "Пожалуста, заполните все обязательные поля",
      });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

const Remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json({
      message: "Сотрудник удален",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

const Update = async (req, res) => {
  try {
    const data = req.body;
    const {id} = req.params;

    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json({
      message: "Данные сотрудника изменены",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

const GetOne = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

module.exports = {
  getAll,
  Add,
  Remove,
  Update,
  GetOne,
};
