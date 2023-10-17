package com.fragile.infosafe.primary.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
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
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Service
public class StorageService {

    //@Value("${AWS_S3_BUCKET_NAME}")
    private String bucketName = System.getenv("AWS_S3_BUCKET_NAME");

    //@Value("${AWS_ACCESS_KEY_ID}")
    private String accessKey = System.getenv("AWS_ACCESS_KEY_ID");

    //@Value("${AWS_SECRET_ACCESS_KEY}")
    private String secretKey = System.getenv("AWS_SECRET_ACCESS_KEY");

    //Persisting to AWS S3
    //@Autowired
    private AmazonS3 s3Client = initializeS3Client();

    public AmazonS3 initializeS3Client(){
        return s3Client = AmazonS3ClientBuilder.standard()
                .withRegion("us-east-1")
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();
    }




    public String uploadFile(MultipartFile file){
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String fileDate = formatter.format(date);
        File fileObj = convertMultiPartFiletoFile(file);
        String fileName = fileDate + "-DatascopeID=" + file.getOriginalFilename();
        try {
            this.s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        }
        catch (AmazonS3Exception e){
            log.error("Unable to upload file", e);
        }
        fileObj.delete();

        return "File Uploaded: " + fileName;
    }

    public byte[] dowloadFile(String fileName){

        S3Object s3Object = this.s3Client.getObject(bucketName, fileName);
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
        this.s3Client.deleteObject(bucketName, fileName);
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
