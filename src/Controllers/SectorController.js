const moment = require('moment-timezone');
const Sector = require('../Models/SectorSchema');
const { validateNameDescription } = require('../Utils/validate');

const sectorGet = async (_req, res) => {
  const sectors = await Sector.find();

  return res.status(200).json(sectors);
};

const sectorGetActive = async (_req, res) => {
  const sectors = await Sector.find({ status: "ativado" }); 

  return res.status(200).json(sectors);
};

const sectorId = async (req, res) => {
  const { id } = req.params;

  try {
    const sector = await Sector.findOne({ _id: id });
    return res.status(200).json(sector);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const sectorCreate = async (req, res) => {
  const { name, description } = req.body;
  try {
    validateNameDescription(name, description);
    const dateNow = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(); 
    const status = 'ativado'
    const sectorInfo = {
      name: name,
      description: description,
      createdAt: dateNow,
      updatedAt: dateNow,
      status: status,
    } 
    const newSector = await Sector.create(sectorInfo);
    return res.status(200).json(newSector);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const sectorUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    validateNameDescription(name, description);
    const dateNow = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(); 
    const sectorInfo = {
      name: name,
      description: description,
      updatedAt: dateNow,
    } 
    const updateStatus = await Sector.findOneAndUpdate({ _id: id }, {sectorInfo}, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const sectorDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Sector.deleteOne({ _id: id });

    return res.json({ message: 'success' });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const sectorDeactivate = async (req, res) => {
  const { id } = req.params;

  try {
    const status = 'desativado';
    const dateNow = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(); 
    const sectorInfo = {
      status: status,
      updatedAt: dateNow,
    } 
    const updateStatus = await Sector.findOneAndUpdate({ _id: id }, { sectorInfo }, { new: true }, (sector) => sector);
    return res.json(updateStatus);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const newestFourSectorsGet = async (_req, res) => {
  const limit = 4;  
  const sortInfo = {
    createdAt: -1, 
  }
  const sectors = await Sector.find().limit(limit).sort(sortInfo);

  return res.status(200).json(sectors);
};

const newestFourActiveSectorsGet = async (_req, res) => {
  const limit = 4; 
  const status = 'ativado';
  const sectorInfo = {
    status: status,
  }
  const sortInfo = {
    createdAt: -1, 
  }
  const sectors = await Sector.find(sectorInfo).limit(limit).sort(sortInfo);

  return res.status(200).json(sectors);
};

module.exports = {
  sectorGet, sectorId, sectorCreate, sectorUpdate, sectorDelete, newestFourSectorsGet, sectorDeactivate, newestFourActiveSectorsGet, sectorGetActive,
};
