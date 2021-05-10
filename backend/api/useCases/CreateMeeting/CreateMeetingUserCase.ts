import { Meetings } from "../../entities/Meetings";
import { IMailProvider } from "../../providers/IMailProviders";
import { IMeetingsRepository } from "../../repositories/IMeetingsRepository";
import { ICreateMeetingRequestDTO } from "./CreateMeetingDTO";

export class CreateMeetingUserCase {

    constructor(
        private meetingRepository: IMeetingsRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(data: ICreateMeetingRequestDTO) {
        const meetingAlredyExistis = await this.meetingRepository.findByPeriod(data.start);

        if (meetingAlredyExistis) {
            throw new Error('Horário indisponivel para reunião');
        }

        const meeting = new Meetings(data);

        await this.meetingRepository.save(meeting);

        await this.mailProvider.sendMail({
            to: {
                name: 'Thiago Gmail',
                email: 'thiagosimi10@gmail.com'
            },
            from: {
                name: 'Thiago',
                email: 'thiagosimi10@hotmail.com'
            },
            subject: 'Primeiro email enviado',
            body: '<h1>Testando envio de email</h1>'
        })
    }

}