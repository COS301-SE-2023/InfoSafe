package com.fragile.infosafe.primary.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.utils.IoUtils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class StorageService {

    @Value("${AWS_S3_BUCKET_NAME}")
    private String bucketName;

    //Persisting to AWS S3
    @Autowired
    private AmazonS3 s3Client;
    public String uploadFile(MultipartFile file){

        File fileObj = convertMultiPartFiletoFile(file);
        String fileName = System.currentTimeMillis() + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        fileObj.delete();

        return "File Uploaded: " + fileName;
    }

    public byte[] dowloadFile(String fileName){

        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();

        try {
            return IoUtils.toByteArray(inputStream);
        }
        catch(IOException e){
            log.error("Unable to upload file to S3", e);
        }

        return null;
    }

    public String deleteFile(String fileName){
        s3Client.deleteObject(bucketName, fileName);
        return fileName + " removed from S3 ...";
    }

    //Converting multipart file to normal file
    private File convertMultiPartFiletoFile(MultipartFile file){

        File convertedFile = new File(file.getOriginalFilename());
        try(FileOutputStream fos = new FileOutputStream(convertedFile)){
            fos.write(file.getBytes());
        }
        catch(IOException e){
            log.error("Error converting multipart file to file", e);
        }

        return convertedFile;
    }
}
