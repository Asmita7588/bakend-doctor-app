/* eslint-disable no-undef */
import { expect } from 'chai';
import sinon from 'sinon';
import * as appointmentService from '../services/appointmentService.js';
import Appointment from "../models/AppointmentModel.js"
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Department from '../models/departmentModel.js';

// eslint-disable-next-line no-undef
describe('Appointment Service Unit Tests', () => {
    // eslint-disable-next-line no-unused-vars
    let existsStub;

    afterEach(() => {
        sinon.restore(); 
    });

    it('should throw an error if the appointment date is in the past', async () => {
        const pastData = {
            patientId: '697b73d23c6a23468a7d89d4',
            doctorId: '697dbe25d1c4b85c2564f366',
            departmentId: '697afe8da0fac07bcb2ab165',
            appointmentDate: '10/01/2026' // Definitely in the past
        };

        try {
            await appointmentService.createAppointment(pastData);
        } catch (error) {
            expect(error.message).to.equal("You cannot book an appointment for a past date.");
        }
    });

    it('should throw an error if the Patient does not exist', async () => {
        sinon.stub(Patient, 'exists').resolves(null);
        sinon.stub(Doctor, 'exists').resolves(true);
        sinon.stub(Department, 'exists').resolves(true);

        const data = {
            patientId: 'invalid_id',
            appointmentDate: '25/12/2026' 
        };

        try {
            await appointmentService.createAppointment(data);
        } catch (error) {
            expect(error.message).to.equal("Patient not found");
        }
    });

    it('should create an appointment if all data is valid', async () => {
        sinon.stub(Patient, 'exists').resolves(true);
        sinon.stub(Doctor, 'exists').resolves(true);
        sinon.stub(Department, 'exists').resolves(true);
        
        const createStub = sinon.stub(Appointment, 'create').resolves({
            _id: 'new_id',
            status: 'BOOKED'
        });

        const validData = {
            patientId: '697b73d23c6a23468a7d89d4',
            doctorId: '697dbe25d1c4b85c2564f366',
            departmentId: '697afe8da0fac07bcb2ab165',
            appointmentDate: '15/02/2026'
        };

        const result = await appointmentService.createAppointment(validData);

        expect(result).to.have.property('_id');
        expect(createStub.calledOnce).to.be.true;
    });
});